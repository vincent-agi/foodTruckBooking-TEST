<?php

namespace App\Repository;

use App\Entity\FoodTruck;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * @extends ServiceEntityRepository<FoodTruck>
 *
 * @method FoodTruck|null find($id, $lockMode = null, $lockVersion = null)
 * @method FoodTruck|null findOneBy(array $criteria, array $orderBy = null)
 * @method FoodTruck[]    findAll()
 * @method FoodTruck[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FoodTruckRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FoodTruck::class);
    }

    public function add(FoodTruck $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(FoodTruck $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getAll($page = 1, $all = false){
        $pageSize = 15;
		$firstResult = (($page - 1) * $pageSize);
        if(!$all){
            $query = $this->createQueryBuilder('f')
            ->setFirstResult($firstResult)
            ->setMaxResults($pageSize)
            ->orderBy('f.createdAt', 'DESC')
            ->getQuery()
            ->execute();
        } else {
            $query = $this->createQueryBuilder('f')
            ->orderBy('f.createdAt', 'DESC')
            ->getQuery()
            ->execute();
        }

        return $query;
    }

    public function countAll(){
        return $this->createQueryBuilder('f')
            ->select('count(f)')
            ->getQuery()
            ->getSingleScalarResult();
    }
}
