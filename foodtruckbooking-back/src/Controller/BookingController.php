<?php

namespace App\Controller;

use App\Repository\BookingRepository;
use App\Entity\Booking;
use App\Repository\FoodTruckRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/booking', name: 'app_booking_')]
class BookingController extends AbstractController
{
    #[Route('/', name: 'all', methods:["GET"])]
    public function listOfBooking(BookingRepository $bookingRepository, Request $request): JsonResponse
    {
        $page = $request->query->get('page', 1);
        $bookings = $bookingRepository->getAll($page);
        return $this->json(["bookings"=>$bookings, "count"=>count($bookings)], 200);
    }

    #[Route('/{id}', name: 'show', methods:["GET"])]
    public function getBooking(BookingRepository $bookingRepository, int $id): JsonResponse
    {
        $booking = $bookingRepository->find($id);
        if($booking == null) {
            return $this->json(["message"=>"Réservation introuvable"], 404);
        }
        return $this->json(["booking"=>$booking], 200);
    }

    #[Route('/new', name: 'new', methods:["POST"])]
    public function newBooking(EntityManagerInterface $manager, Request $request, ValidatorInterface $validator, FoodTruckRepository $foodtruckRepository): JsonResponse
    {
        $messages= null ;
        $data = json_decode($request->getContent(), true);
        try {
            $booking = new Booking($data);
            $foodtruck = $foodtruckRepository->find($data["foodtruck"]);
            if($foodtruck == null) {
                return $this->json(["message"=>"Le foodtruck associé à la réservation n'existe pas"], 404);
            }
            $booking->setFoodTruck($foodtruck);
            $errors = $validator->validate($booking);
            if(count($errors) > 0){
                foreach($errors as $error) {
                    $messages[] = "property : " . $error->getPropertyPath() . ". error : " . $error->getMessage();
                }
                return $this->json(["message"=>implode($messages)], 500);
            }
        } catch(Exception $ex) {
            $this->json(["message"=>"Une erreur est survenue durant l'ajout de la réservation"], 500);
        }
        $manager->persist($booking);
        $manager->flush();

        return $this->json(["booking"=>$booking, "message"=>"Votre réservation à bien ete ajouté"], 201);
    }
    
    #[Route('/{id}', name: 'update', methods:["PUT", "PATCH"])]
    public function updateBooking(EntityManagerInterface $manager, Request $request, ValidatorInterface $validator, $id, BookingRepository $bookingRepository, FoodTruckRepository $foodtruckRepository): JsonResponse
    {
        $booking = $bookingRepository->find($id);
        if($booking == null) {
            return $this->json(["message"=>"Le foodtruck est introuvable"], 404);
        }
        $messages= null ;
        $data = json_decode($request->getContent(), true);
        try {
            $booking->modifyBulkProperties($data);
            $foodtruck = $foodtruckRepository->find($data["foodtruck"]);
            if($foodtruck == null) {
                return $this->json(["message"=>"Le foodtruck associé à la réservation n'existe pas"], 404);
            }
            $booking->setFoodTruck($foodtruck);
            $errors = $validator->validate($booking);
            if(count($errors) > 0){
                foreach($errors as $error) {
                    $messages[] = "property : " . $error->getPropertyPath() . ". error : " . $error->getMessage();
                }
                return $this->json(["message"=>implode($messages)], 500);
            }
        } catch(Exception $ex) {
            $this->json(["message"=>"Une erreur est survenue durant l'ajout du foodtruck"], 500);
        }
        $manager->persist($booking);
        $manager->flush();

        return $this->json(["booking"=>$booking, "message"=>"Votre réservation à bien ete ajouté"], 201);
    }

    #[Route('/{id}', name:'delete', methods:["DELETE"])]
    public function delete(EntityManagerInterface $manager, int $id, BookingRepository $bookingRepository)
    {
        $booking = $bookingRepository->find($id);
        if($booking == null) {
            return $this->json(['message'=>"La réservation est introuvable"], 404);
        }
        $manager->remove($booking);
        $manager->flush();
        return $this->json(null, 204);
    }
}
