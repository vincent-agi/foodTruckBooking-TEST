import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Foodtruck } from '../interfaces/Foodtruck';
import { FoodtruckService } from '../services/foodtruck.service';

@Component({
  selector: 'app-foodtruck',
  templateUrl: './foodtruck.component.html',
  styleUrls: ['./foodtruck.component.scss']
})
export class FoodtruckComponent implements OnInit {

  public dataSource: MatTableDataSource<Foodtruck> = new MatTableDataSource();
  public foodtrucksList: Foodtruck[] = []
  public foodtruck$!: Observable<Foodtruck[]>;
  public displayedColumns: string[] = ['name', 'createdAt', 'actions'];

  constructor(private foodtruckService: FoodtruckService) { }

  ngOnInit(): void {
    this.getAllFoodtrucks()
  }

  public getAllFoodtrucks() {
    this.foodtruck$ = this.foodtruckService.getAll().subscribe((data:Foodtruck[])=> {
      this.foodtrucksList = data;
      this.dataSource = new MatTableDataSource(this.foodtrucksList);
    })
  }

}
