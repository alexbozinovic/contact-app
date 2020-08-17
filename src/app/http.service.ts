import { Injectable } from '@angular/core';
import { Contacts } from './contact-arr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contacts[]>{
    return this.http.get<Contacts[]>('http://demo5838836.mockable.io/contact');
  }
}
