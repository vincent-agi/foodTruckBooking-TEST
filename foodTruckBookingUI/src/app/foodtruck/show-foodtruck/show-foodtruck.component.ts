import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Foodtruck } from 'src/app/interfaces/Foodtruck';
import { FoodtruckService } from 'src/app/services/foodtruck.service';

@Component({
  selector: 'app-show-foodtruck',
  templateUrl: './show-foodtruck.component.html',
  styleUrls: ['./show-foodtruck.component.scss']
})
export class ShowFoodtruckComponent implements OnInit {

  public foodtruck!: Foodtruck;
  public foodtruckForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private activatedRoute: ActivatedRoute, private foodtruckService: FoodtruckService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter)=> {
      this.getFoodtruck(parameter["foodtruckId"]);
    });
  }

  public getFoodtruck(id:number): void
 {
   this.foodtruckService.getOne(id).then((data)=> {
     this.foodtruck = data;
   }).then(()=>{
    this.autoCompleteForm(this.foodtruck)
   });
 }

 public autoCompleteForm(foodtruck:Foodtruck): void{
   this.foodtruckForm.controls['name'].setValue(foodtruck.name);
 }

 public updateFoodtruck(): void
 {
   let result: boolean = false;
   this.foodtruck.name = this.foodtruckForm.get('name')?.value;
   this.foodtruckService.updatePATCH(this.foodtruck).then((data)=> {
     result = true;
     this.foodtruck = data;
   }).finally(()=> {
     this.foodtruckService.notifyUpdated(result);
   })
 }

 public onBookingAdded($event: any): void
 {
   this.foodtruck.bookings?.push($event);
 }

}
