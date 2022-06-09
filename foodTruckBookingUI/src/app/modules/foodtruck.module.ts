import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFoodtruckComponent } from '../foodtruck/register-foodtruck/register-foodtruck.component';
import { ShowFoodtruckComponent } from '../foodtruck/show-foodtruck/show-foodtruck.component';
import { FoodtruckComponent } from '../foodtruck/foodtruck.component';
import { FoodtruckRoutingModule } from '../routing/foodtruck-rooting.module';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    RegisterFoodtruckComponent,
    ShowFoodtruckComponent,
    FoodtruckComponent
  ],
  imports: [
    CommonModule,
    FoodtruckRoutingModule,
    SharedModule
  ]
})
export class FoodtruckModule { }
