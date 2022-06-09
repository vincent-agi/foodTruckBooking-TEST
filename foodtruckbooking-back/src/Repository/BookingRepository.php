<?php

namespace App\Repository;

use App\Entity\Booking;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;
use phpDocumentor\Reflection\Types\Boolean;

/**
 * @extends ServiceEntityRepository<Booking>
 *
 * @method Booking|null find($id, $lockMode = null, $lockVersion = null)
 * @method Booking|null findOneBy(array $criteria, array $orderBy = null)
 * @method Booking[]    findAll()
 * @method Booking[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Booking::class);
    }

    public function add(Booking $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Booking $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }


    public function getAll($page = 1){
        $pageSize = 15;
		$firstResult = (($page - 1) * $pageSize);
        return $this->createQueryBuilder('b')
            ->setFirstResult($firstResult)
            ->setMaxResults($pageSize)
            ->orderBy('b.createdAt', 'DESC')
            ->getQuery()
            ->execute();
    }

    public function countAll(){
        return $this->createQueryBuilder('b')
            ->select('count(b)')
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function checkPlaceAvailable($date): bool{
        $limit = null;
        $outPlace = true;
        $day = date('l', strtotime($date));
        switch($day) {
            case "Monday":
            case "Tuesday":
            case "Wednesday":
            case "Thursday":
                $limit = 7;
                break;
            case "Friday":
                $limit = 6;
                break;
            default:
                $limit = 7;
        }
        $countBookingByDate = $this->createQueryBuilder('b')
        ->select('count(b)')
        ->where('b.bookingAt = :date')
        ->setParameter('date', $date)
        ->getQuery()
        ->getSingleScalarResult();
        if($countBookingByDate >= $limit){
            $outPlace = false;
        }
        return $outPlace;
    }
}
