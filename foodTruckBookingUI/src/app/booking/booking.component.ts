import { Component, OnInit } from '@angular/core';
import { Booking } from '../interfaces/Booking';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  public bookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getAll(1).subscribe((data:any)=> {
      this.bookings = data['bookings']
      console.log(data);
    })
  }

}
