import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Foodtruck } from 'src/app/interfaces/Foodtruck';
import { FoodtruckService } from 'src/app/services/foodtruck.service';

@Component({
  selector: 'app-register-foodtruck',
  templateUrl: './register-foodtruck.component.html',
  styleUrls: ['./register-foodtruck.component.scss']
})
export class RegisterFoodtruckComponent implements OnInit {

  public foodtruckForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  constructor(private foodtruckService: FoodtruckService, private router: Router) { }

  ngOnInit(): void {

  }

  public submitFoodtruckForm() {
    let foodtruck: Foodtruck = {
      'id': 0,
      'createdAt': undefined,
      'updatedAt': undefined,
      'name': this.foodtruckForm.get("name")?.value
    }
    let result = false;
    this.foodtruckService.create(foodtruck).then(()=> {
      result = true;
      this.router.navigateByUrl('/foodtrucks');
    }).finally(()=> {
      this.foodtruckService.notifyAdded(result)
    })
  }

}
