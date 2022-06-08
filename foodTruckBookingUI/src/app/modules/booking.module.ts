import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowBookingComponent } from '../booking/show-booking/show-booking.component';
import { BookingComponent } from '../booking/booking.component';
import { BookingRoutingModule } from '../routing/booking-routing.module';



@NgModule({
  declarations: [
    ShowBookingComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
