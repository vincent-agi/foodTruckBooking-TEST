import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/interfaces/Booking';
import { BookingService } from 'src/app/services/booking.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-show-booking',
  templateUrl: './show-booking.component.html',
  styleUrls: ['./show-booking.component.scss']
})
export class ShowBookingComponent implements OnInit {

  public booking!: Booking;

  constructor(private activatedRoute: ActivatedRoute, private bookingService:BookingService, private router: Router,
     private translate: TranslateService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter)=>{
      this.getBooking(parameter['bookingId']);
    })
  }

  public getBooking(id: number): void{
    this.bookingService.getOne(id).then((data)=>{
      this.booking = data;
    });
  }

  public delete(booking:Booking): void{
    let result: boolean = false;
    this.bookingService.delete(booking.id).then().catch(()=>{
      result = false;
    }).finally(()=>{
      this.router.navigateByUrl('/bookings');
      result = true
      this.bookingService.notifyDelete(result);
    });
  }

}
