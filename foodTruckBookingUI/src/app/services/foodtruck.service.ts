import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foodtruck } from '../interfaces/Foodtruck';

@Injectable({
  providedIn: 'root'
})
export class FoodtruckService {

  constructor(private http: HttpClient) { }

  public getAll(page: number = 1): Observable<Foodtruck[]>
  {
    return this.http.get<Foodtruck[]>(environment.baseApiUrl + 'foodtruck', {params: new HttpParams().set('page', page)});
  }

  public getOne(id:number): Observable<Foodtruck>
  {
    return this.http.get<Foodtruck>(environment.baseApiUrl + 'foodtruck/' + id);
  }

  public create(foodtruck:Foodtruck): Observable<Foodtruck>
  {
    return this.http.post<Foodtruck>(environment.baseApiUrl + 'foodtruck/new', foodtruck)
  }

  public updatePUT(foodtruck: Foodtruck): Observable<Foodtruck>
  {
    return this.http.put<Foodtruck>(environment.baseApiUrl + "foodtruck/" + foodtruck.id, foodtruck);
  }

  public updatePATCH(foodtruck: Foodtruck): Observable<Foodtruck>
  {
    return this.http.patch<Foodtruck>(environment.baseApiUrl + "foodtruck/" + foodtruck.id, foodtruck);
  }

  public delete(id: number): Observable<Foodtruck>
  {
    return this.http.delete<Foodtruck>(environment.baseApiUrl + 'foodtruck/' + id);
  }
}
