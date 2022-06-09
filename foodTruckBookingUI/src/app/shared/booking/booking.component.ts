import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Foodtruck } from 'src/app/interfaces/Foodtruck';
import { Booking } from '../../interfaces/Booking';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  public dataSource: MatTableDataSource<Booking> = new MatTableDataSource();
  public bookingsList: Booking[] = [];
  public bookingCount : number = 0;
  public displayedColumns: string[] = ['bookingAt', 'createdAt', 'actions'];

  @Input('foodtruck') foodtruck: Foodtruck | undefined = undefined;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    if(this.foodtruck === undefined){
      this.getAllBookings();
    } else {
      this.bookingsList = this.foodtruck.bookings ? this.foodtruck.bookings : [];
      this.dataSource.data = this.bookingsList;
      this.countBooking();
    }
  }

  public getAllBookings() {
    this.bookingService.getAll().then((data)=>{
      this.bookingsList = data
      this.dataSource.data = this.bookingsList;
    }).finally(() => {
      this.countBooking();
    })
  }

  public countBooking(): void
  {
    this.bookingService.countAll().then((data)=> {
      this.bookingCount = data;
    });
  }

  public onPageChange($event: PageEvent)
  {
    let page: number = $event.pageIndex + 1;
    this.bookingService.getAll(page).then((data)=> {
      this.bookingsList = data;
      this.dataSource.data = [];
      this.dataSource.data = this.bookingsList;
    })
  }

  delete(element: Booking) {
    let result: boolean = false;
    this.bookingService.delete(element.id).then(() => {
      this.dataSource.data = this.dataSource.data.filter(el => el != element);
      result = true;
    }).finally(() => {
      this.countBooking();
      this.bookingService.notifyDelete(result);
    });
  }

  public updateFoodtruck(foodtruck: Foodtruck): void
  {
    console.log("update foodtruck booking component");

    this.bookingsList = foodtruck.bookings ? foodtruck.bookings : [];
      this.dataSource.data = this.bookingsList;
      this.countBooking();
  }
}
