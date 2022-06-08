import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../interfaces/Booking';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  public getAll(page: number = 1): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(environment.baseApiUrl + "booking", {params : new HttpParams().set('page', page)});
  }

  public getOne(id:number): Observable<Booking>
  {
    return this.http.get<Booking>(environment.baseApiUrl + 'booking/' + id);
  }

  public updatePUT(booking:Booking): Observable<Booking>
  {
    return this.http.put<Booking>(environment.baseApiUrl + ' booking/' + booking.id, booking);
  }

  public updatePATCH(booking: Booking): Observable<Booking>
  {
    return this.http.patch<Booking>(environment.baseApiUrl + 'booking/' + booking.id, booking);
  }

  public create(booking:Booking): Observable<Booking>
  {
    return this.http.post<Booking>(environment.baseApiUrl + 'booking/new', booking);
  }

  public delete(id: number): Observable<Booking>
  {
    return this.http.delete<Booking>(environment.baseApiUrl + 'booking/' + id)
  }
}
