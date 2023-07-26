import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
    // console.log(this.tokenStorage.getUser());
}

  stripePayment(data:any): Observable<any>{
    return this.http.post('/api/payment', {
      data,
    }, httpOptions);
  }
  
  stripePaymentkey(data:any): Observable<any>{
    return this.http.post('/api/paymentkey', {data}, httpOptions);
  }

  updatepayment(data:any): Observable<any>{
    return this.http.post('/api/updatepayment/'+this.uuid, {
      data,
    }, httpOptions);
  }

  getpaymentinteg(): Observable<any>{
    return this.http.post('/api/getpaymentinteg/'+this.uuid, {}, httpOptions);
  }

  updatecheckoutstyle(data:any): Observable<any>{
    return this.http.post('/api/updatecheckoutstyle/'+this.uuid, {
      data,
    }, httpOptions);
  }

  getallcheckoutdata(data:any): Observable<any>{
    return this.http.post('/api/getallcheckoutdata', {
      data,
    }, httpOptions);
  }

  getnextstepurl(data:any): Observable<any>{
    return this.http.post('/api/getnextstepurl', {
      data,
    }, httpOptions);
  }


  
  

}
