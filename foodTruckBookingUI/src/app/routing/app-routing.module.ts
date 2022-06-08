import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';

const routes: Routes = [
  { path:'', component:AppComponent },
  { path:'bookings', loadChildren: () => import('../modules/booking.module').then(m => m.BookingModule) },
  { path:'foodtrucks', loadChildren: () => import('../modules/foodtruck.module').then(m => m.FoodtruckModule) },
  { path:'**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
