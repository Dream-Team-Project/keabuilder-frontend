import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  uniqueuserid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uniqueuserid = this.tokenStorage.getUser().uniqueid;
    // console.log(this.tokenStorage.getUser());
}

  stripePayment(data:any): Observable<any>{
    return this.http.post('/api/payment', {
      data,
    }, httpOptions);
  }
  
  stripePaymentkey(): Observable<any>{
    return this.http.post('/api/paymentkey', {}, httpOptions);
  }

  updatepayment(data:any): Observable<any>{
    return this.http.post('/api/updatepayment/'+this.uniqueuserid, {
      data,
    }, httpOptions);
  }

  getpaymentinteg(): Observable<any>{
    return this.http.post('/api/getpaymentinteg/'+this.uniqueuserid, {}, httpOptions);
  }

}
