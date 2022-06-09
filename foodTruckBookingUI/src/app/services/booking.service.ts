import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Booking } from '../interfaces/Booking';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient, private translate: TranslateService, private snackbar: MatSnackBar) { }

  public getAll(page: number = 1): Promise<Booking[]>
  {
    return firstValueFrom(
      this.http.get<Booking[]>(environment.baseApiUrl + "booking",
       {params : new HttpParams().set('page', page)}
      )
    );
  }

  public countAll(): Promise<number>
  {
    return firstValueFrom(
      this.http.get<number>(environment.baseApiUrl + 'booking/count')
    );
  }

  public getOne(id:number): Promise<Booking>
  {
    return firstValueFrom(
      this.http.get<Booking>(environment.baseApiUrl + 'booking/' + id)
    );
  }

  public updatePUT(booking:Booking): Promise<Booking>
  {
    return firstValueFrom(
      this.http.put<Booking>(environment.baseApiUrl + ' booking/' + booking.id, booking)
    );
  }

  public updatePATCH(booking: Booking): Promise<Booking>
  {
    return firstValueFrom(
      this.http.patch<Booking>(environment.baseApiUrl + 'booking/' + booking.id, booking)
    );
  }

  public create(booking:Booking): Promise<Booking>
  {
    return firstValueFrom(
      this.http.post<Booking>(environment.baseApiUrl + 'booking/new', booking)
    );
  }

  public delete(id: number): Promise<Booking>
  {
    return firstValueFrom(
      this.http.delete<Booking>(environment.baseApiUrl + 'booking/' + id)
    )
  }

  public notifyAdded(success: boolean): void
  {
    if(success){
      this.openSnackbar(this.getTranslation("booking.success.addedWithSuccess"))
    } else {
      this.openSnackbar(this.getTranslation("booking.fail.addedWithFailed"))
    }
  }

  public notifyDelete(success: boolean): void
  {
    if(success){
      this.openSnackbar(this.getTranslation("booking.success.deletedWithSuccess"))
    } else {
      this.openSnackbar(this.getTranslation("booking.fail.deletedWithFailed"))
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
