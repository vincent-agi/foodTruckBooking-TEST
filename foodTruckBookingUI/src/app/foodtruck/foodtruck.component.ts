import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Foodtruck } from '../interfaces/Foodtruck';
import { FoodtruckService } from '../services/foodtruck.service';

@Component({
  selector: 'app-foodtruck',
  templateUrl: './foodtruck.component.html',
  styleUrls: ['./foodtruck.component.scss']
})
export class FoodtruckComponent implements OnInit {

  public dataSource: MatTableDataSource<Foodtruck> = new MatTableDataSource();
  public foodtrucksList: Foodtruck[] = [];
  public foodtrucksCount : number = 0;
  public displayedColumns: string[] = ['name', 'createdAt', 'actions'];

  constructor(private foodtruckService: FoodtruckService) { }

  ngOnInit(): void {
    this.getAllFoodtrucks();
  }

  public getAllFoodtrucks() {
    this.foodtruckService.getAll().then((data)=>{
      this.foodtrucksList = data
      this.dataSource.data = this.foodtrucksList;
    }).finally(() => {
      this.countFoodTrucks();
    })
  }

  public countFoodTrucks(): void
  {
    this.foodtruckService.countAll().then((data)=> {
      this.foodtrucksCount = data;
    });
  }

  public onPageChange($event: PageEvent)
  {
    let page: number = $event.pageIndex + 1;
    this.foodtruckService.getAll(page).then((data)=> {
      this.foodtrucksList = data;
      this.dataSource.data = [];
      this.dataSource.data = this.foodtrucksList;
    })
  }

  delete(element: Foodtruck) {
    let result : boolean = false;
    this.foodtruckService.delete(element.id).then(() => {
      this.dataSource.data = this.dataSource.data.filter(el => el != element)
      result = true;
    }).finally(() => {
      this.countFoodTrucks();
      this.foodtruckService.notifyDelete(result)
    });
  }

}
