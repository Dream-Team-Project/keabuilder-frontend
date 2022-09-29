import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  stripePayment(data:any): Observable<any>{
    return this.http.post('/api/payment', {
      data,
    }, httpOptions);
  }
  
  stripePaymentkey(): Observable<any>{
    return this.http.post('/api/paymentkey', {}, httpOptions);
  }

}
