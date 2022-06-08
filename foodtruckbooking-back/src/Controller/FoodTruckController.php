<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\FoodTruck;
use App\Repository\FoodTruckRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/foodtruck', name: 'app_foodtruck_')]
class FoodTruckController extends AbstractController
{
    #[Route('/', name:'all', methods:['GET'])]
    public function listOfFoodTrucks(FoodTruckRepository $foodTruckRepository, Request $request): JsonResponse
    {
        $page = $request->query->get('page', 1);
        $foodTrucks = $foodTruckRepository->getAll($page);
        return $this->json(["foodtrucks"=>$foodTrucks, "count"=>count($foodTrucks)], 200);
    }

    #[Route('/{id}', name: 'show', methods:["GET"])]
    public function getFoodTruck(FoodTruckRepository $foodTruckRepository, int $id): JsonResponse
    {
        $foodtruck = $foodTruckRepository->find($id);
        if($foodtruck == null) {
            return $this->json(["message"=>"foodtruck introuvable"], 404);
        }
        return $this->json(["foodtruck"=>$foodtruck], 200);
    }

    #[Route('/new', name: 'new', methods:["POST"])]
    public function newFoodTruck(EntityManagerInterface $manager, Request $request, ValidatorInterface $validator): JsonResponse
    {
        $messages= null ;
        $data = json_decode($request->getContent(), true);
        try {
            $foodtruck = new FoodTruck($data);

            // create bookings
            foreach($data["bookings"] as $bookingAt) {
                $booking = new Booking(["bookingAt"=>$bookingAt]);
                $foodtruck->addBooking($booking);
                $manager->persist($booking);
            } 

            $errors = $validator->validate($foodtruck);
            if(count($errors) > 0){
                foreach($errors as $error) {
                    $messages[] = "property : " . $error->getPropertyPath() . ". error : " . $error->getMessage();
                }
                return $this->json(["message"=>implode($messages)], 500);
            }
        } catch(Exception $ex) {
            $this->json(["message"=>"Une erreur est survenue durant l'ajout du foodtruck"], 500);
        }
        $manager->persist($foodtruck);
        $manager->flush();

        return $this->json(["foodtruck"=>$foodtruck, "message"=>"Votre foodtruck à bien ete ajouté"], 201);
    }
    
    #[Route('/{id}', name: 'update', methods:["PUT", "PATCH"])]
    public function updateFoodTruck(EntityManagerInterface $manager, Request $request, ValidatorInterface $validator, int $id, FoodTruckRepository $foodTruckRepository): JsonResponse
    {
        $foodtruck = $foodTruckRepository->find($id);
        if($foodtruck == null) {
            return $this->json(["message"=>"Le foodtruck est introuvable"], 404);
        }
        $messages= null ;
        $data = json_decode($request->getContent(), true);
        try {
            $foodtruck->modifyBulkProperties($data);
            $errors = $validator->validate($foodtruck);
            if(count($errors) > 0){
                foreach($errors as $error) {
                    $messages[] = "property : " . $error->getPropertyPath() . ". error : " . $error->getMessage();
                }
                return $this->json(["message"=>implode($messages)], 500);
            }
        } catch(Exception $ex) {
            $this->json(["message"=>"Une erreur est survenue durant l'ajout du foodtruck"], 500);
        }
        $manager->persist($foodtruck);
        $manager->flush();

        return $this->json(["foodtruck"=>$foodtruck, "message"=>"Votre foodtruck à bien ete ajouté"], 201);
    }

    #[Route('/{id}', name:'delete', methods:["DELETE"])]
    public function delete(EntityManagerInterface $manager, int $id, FoodTruckRepository $foodTruckRepository)
    {
        $foodtruck = $foodTruckRepository->find($id);
        if($foodtruck == null) {
            return $this->json(['message'=>"Le foodtruck est introuvable"], 404);
        }
        $manager->remove($foodtruck);
        $manager->flush();
        return $this->json(null, 204);
    }
}
