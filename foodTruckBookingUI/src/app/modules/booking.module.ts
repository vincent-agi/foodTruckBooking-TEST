import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowBookingComponent } from '../booking/show-booking/show-booking.component';
import { BookingComponent } from '../booking/booking.component';
import { BookingRoutingModule } from '../routing/booking-routing.module';
import { SharedModule } from './shared.module';



@NgModule({
  declarations: [
    ShowBookingComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule
  ]
})
export class BookingModule { }
