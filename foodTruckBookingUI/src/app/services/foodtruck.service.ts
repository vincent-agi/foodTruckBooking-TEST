import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foodtruck } from '../interfaces/Foodtruck';
import { HeadersService } from './headers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class FoodtruckService {

  constructor(private http: HttpClient, private headersService: HeadersService, private translate: TranslateService, private snackbar: MatSnackBar) { }

  public getAll(page: number = 1, all: boolean = false): Promise<Foodtruck[]>
  {
    return firstValueFrom(
      this.http.get<Foodtruck[]>(environment.baseApiUrl + 'foodtruck',
        {params: new HttpParams()
          .set('page', page)
          .set('all', all),
        headers: this.headersService.getHttpHeaders()})
      );
  }

  public countAll(): Promise<number>
  {
    return firstValueFrom(
      this.http.get<number>(environment.baseApiUrl + 'foodtruck/count')
    );
  }

  public getOne(id:number): Promise<Foodtruck>
  {
    return firstValueFrom(
      this.http.get<Foodtruck>(environment.baseApiUrl + 'foodtruck/' + id)
    );
  }

  public create(foodtruck:Foodtruck): Promise<Foodtruck>
  {
    return firstValueFrom(
      this.http.post<Foodtruck>(environment.baseApiUrl + 'foodtruck/new', foodtruck)
    );
  }

  public updatePUT(foodtruck: Foodtruck): Promise<Foodtruck>
  {
    return firstValueFrom(
      this.http.put<Foodtruck>(environment.baseApiUrl + "foodtruck/" + foodtruck.id, foodtruck)
    );
  }

  public updatePATCH(foodtruck: Foodtruck): Promise<Foodtruck>
  {
    return firstValueFrom(
      this.http.patch<Foodtruck>(environment.baseApiUrl + "foodtruck/" + foodtruck.id, foodtruck)
    );
  }

  public delete(id: number): Promise<Foodtruck>
  {
    return firstValueFrom(
      this.http.delete<Foodtruck>(environment.baseApiUrl + 'foodtruck/' + id)
    );
  }

  public notifyAdded(success: boolean): void
  {
    if(success){
      this.openSnackbar(this.getTranslation("foodtruck.success.addedWithSuccess"))
    } else {
      this.openSnackbar(this.getTranslation("foodtruck.fail.addedWithFailed"))
    }
  }

  public notifyUpdated(success: boolean): void
  {
    if(success){
      this.openSnackbar(this.getTranslation("foodtruck.success.updatedWithSuccess"))
    } else {
      this.openSnackbar(this.getTranslation("foodtruck.fail.updatedWithFailed"))
    }
  }

  public notifyDelete(success: boolean): void
  {
    if(success){
      this.openSnackbar(this.getTranslation("foodtruck.success.deletedWithSuccess"))
    } else {
      this.openSnackbar(this.getTranslation("foodtruck.fail.deletedWithFailed"))
    }
  }

  private openSnackbar(message:string): void{
    this.snackbar.open(message, 'Ok')
  }

  private getTranslation(key:string): string{
    let message: string = ''
    this.translate.get(key).subscribe((data: string)=> {
      message = data
    });
    return message;
  }
}
