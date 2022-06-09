import { Booking } from "./Booking";

export interface Foodtruck {
  id: number
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  bookings?: Booking[];
}
