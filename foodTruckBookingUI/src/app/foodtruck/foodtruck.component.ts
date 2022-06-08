import { Component, OnInit } from '@angular/core';
import { Foodtruck } from '../interfaces/Foodtruck';
import { FoodtruckService } from '../services/foodtruck.service';

@Component({
  selector: 'app-foodtruck',
  templateUrl: './foodtruck.component.html',
  styleUrls: ['./foodtruck.component.scss']
})
export class FoodtruckComponent implements OnInit {

  public foodtrucks: Foodtruck[] = [];

  constructor(private foodtruckService: FoodtruckService) { }

  ngOnInit(): void {
    console.log('foodtruck');

    this.foodtruckService.getAll().subscribe((data:any)=> {
      console.log(data);
    })
  }

}
