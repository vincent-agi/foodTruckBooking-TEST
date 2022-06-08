import { Foodtruck } from "./Foodtruck";

export interface Booking {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  bookingAt: Date;
  foodtruck: Foodtruck
}
