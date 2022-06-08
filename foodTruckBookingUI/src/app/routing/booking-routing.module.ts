import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { BookingComponent } from '../booking/booking.component';
import { ShowBookingComponent } from '../booking/show-booking/show-booking.component';

const routes: Routes = [
  { path:'', component:BookingComponent },
  { path:'/:bookingId', component: ShowBookingComponent },
  { path:'**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
