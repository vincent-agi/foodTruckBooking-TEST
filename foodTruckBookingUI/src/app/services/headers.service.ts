import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  public httpHeaders:HttpHeaders = new HttpHeaders().set("Content-Type", "application/json");

  constructor() {}

   getHttpHeaders(): HttpHeaders {
     return this.httpHeaders;
   }
}
