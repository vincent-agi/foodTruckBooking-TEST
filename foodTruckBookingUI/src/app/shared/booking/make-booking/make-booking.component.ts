import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/interfaces/Booking';
import { Foodtruck } from 'src/app/interfaces/Foodtruck';
import { BookingService } from 'src/app/services/booking.service';
import { FoodtruckService } from 'src/app/services/foodtruck.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.scss']
})
export class MakeBookingComponent implements OnInit {

  @Input('foodtruck') foodtruck: Foodtruck | undefined = undefined;
  @Output("bookingAdded") bookingAdded = new EventEmitter();

  public bookingForm : FormGroup = new FormGroup({
    bookingAt: new FormControl('', Validators.required),
    foodtruckname: new FormControl('', Validators.required),
  });

  public foodtrucks: Foodtruck[] = [];
  public tomorrow: Date = new Date(new Date().getDate() + 1);
  public filteredDates = (d: Date | null): boolean => {
    const date = (d || new Date())
    return date >= this.tomorrow
  }

  constructor(private bookingService: BookingService, private foodtruckService: FoodtruckService, private snackbar:MatSnackBar, private translate: TranslateService) { }

  ngOnInit() {
    if(this.foodtruck === undefined) {
      this.getFoodtrucks()
    } else {
      this.foodtrucks.push(this.foodtruck);
      this.completeForm(this.foodtruck)
    }


  }

  public completeForm(foodtruck: Foodtruck): void{
    this.bookingForm.controls['foodtruckname'].setValue(foodtruck.name);
  }

  public getFoodtrucks(): void{
    this.foodtruckService.getAll(0, true).then((data)=> {
      this.foodtrucks = data;
    });
  }

  public selectionFoodtruck($event: any) :void
  {
    this.foodtruck = $event.value;
  }

  public makeBooking(): void
  {
    let result: boolean = false;
    let booking: Booking = {
      id: 0,
      bookingAt: this.bookingForm.get('bookingAt')?.value,
      foodtruck: this.foodtruck
    }
    this.bookingService.create(booking).then((data)=> {
      result = true;
      this.bookingAdded.emit(data);
      this.foodtruck?.bookings?.push(data);
    }).catch(error => {
      result = false;
    }).finally(()=> {
      this.bookingService.notifyAdded(result);
    })
  }

}

