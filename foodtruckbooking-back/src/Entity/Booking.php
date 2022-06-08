<?php

namespace App\Entity;

use App\Repository\BookingRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JsonSerializable;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks as HasLifecycleCallbacks;

#[ORM\Entity(repositoryClass: BookingRepository::class)]
#[HasLifecycleCallbacks]
class Booking implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Assert\GreaterThan('today')]
    #[Assert\NotBlank]
    private $bookingAt;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private $updatedAt;

    #[ORM\ManyToOne(targetEntity: FoodTruck::class, inversedBy: 'bookings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank]
    private $foodTruck;

    public function  __construct($data = null)
    {   
        if($data != null) {
            foreach($data as $key => $value) {
                switch($key) {
                    case "bookingAt":
                        $this->{$key} = new \DateTimeImmutable($value);
                        break;
                    default:
                        $this->{$key} = $value;
                }
            }
            $this->applyDateTime();
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBookingAt(): ?\DateTimeImmutable
    {
        return $this->bookingAt;
    }

    public function setBookingAt(\DateTimeImmutable $bookingAt): self
    {
        $this->bookingAt = $bookingAt;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getFoodTruck(): ?FoodTruck
    {
        return $this->foodTruck;
    }

    public function setFoodTruck(?FoodTruck $foodTruck): self
    {
        $this->foodTruck = $foodTruck;

        return $this;
    }

    #[ORM\PreUpdate]
    #[ORM\PrePersist]
    private function applyDateTime() {
        $currentDate = new \DateTimeImmutable('now');
        if($this->getCreatedAt() != null) {
            $this->setUpdatedAt($currentDate);
        } else {
            $this->setCreatedAt($currentDate);
        }
    }

    public function jsonSerialize(): mixed
    {
        return [
            "id"=>$this->getId(),
            "createdAt"=>$this->getCreatedAt(),
            "updatedAt"=>$this->getUpdatedAt(),
            "bookingAt"=>$this->getBookingAt()
        ];
    }

    public function modifyBulkProperties($data): bool | \Exception {
        $status = false;
        try {
            foreach($data as $key => $value) {
                $this->{$key} = $value;
            }
            $status = true;
        } catch(\Exception $ex) {
            $status = $ex;
        }

        $this->applyDateTime();

        return $status;
    }
}
