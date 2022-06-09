import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { BookingComponent } from '../booking/booking.component';
import { FoodtruckComponent } from '../foodtruck/foodtruck.component';
import { RegisterFoodtruckComponent } from '../foodtruck/register-foodtruck/register-foodtruck.component';
import { ShowFoodtruckComponent } from '../foodtruck/show-foodtruck/show-foodtruck.component';

const routes: Routes = [
  { path:'', component: FoodtruckComponent },
  { path:'/:foodtruckId', component: ShowFoodtruckComponent },
  { path: '/register', component: RegisterFoodtruckComponent},
  { path:'**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodtruckRoutingModule { }
