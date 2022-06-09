<?php

namespace App\Entity;

use App\Repository\FoodTruckRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JsonSerializable;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks as HasLifecycleCallbacks;

#[ORM\Entity(repositoryClass: FoodTruckRepository::class)]
#[HasLifecycleCallbacks]
class FoodTruck implements JsonSerializable
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    private $name;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private $updatedAt;

    #[ORM\OneToMany(mappedBy: 'foodTruck', targetEntity: Booking::class, orphanRemoval: true)]
    private $bookings;

    public function __construct($data = null)
    {
        $this->bookings = new ArrayCollection();
        if($data != null) {
            foreach($data as $key => $value) {
                if($key == "bookings") {
                    continue;
                }
                $this->{$key} = $value;
            }
            $this->createdAt = new \DateTimeImmutable(('now'));
            $this->applyDateTime();
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): self
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings[] = $booking;
            $booking->setFoodTruck($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): self
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getFoodTruck() === $this) {
                $booking->setFoodTruck(null);
            }
        }

        return $this;
    }

    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    private function applyDateTime(): void {
        $currentDate = new \DateTimeImmutable('now');
        if($this->createdAt != null) {
            $this->setUpdatedAt($currentDate);
        } else {
            $this->setCreatedAt($currentDate);
        }
    }

    public function jsonSerialize(): mixed
    {
        return [
            "id"=>$this->getId(),
            "name"=>$this->getName(),
            "createdAt"=>$this->getCreatedAt(),
            "updatedAt"=>$this->getUpdatedAt(),
            "bookings"=>$this->getBookings()->toArray()
        ];
    }

    public function modifyBulkProperties($data): bool | \Exception {
        $status = false;
        try {
            foreach($data as $key => $value) {
                switch($key)
                {
                    case "createdAt":
                    case "updatedAt":
                        $this->{$key} = new \DateTimeImmutable($value);
                    break;
                    case "bookings":
                        break;
                    default:
                        $this->{$key} = $value;
                }
            }
            $status = true;
        } catch(\Exception $ex) {
            $status = $ex;
        }
        $this->applyDateTime();

        return $status;
    }
}
