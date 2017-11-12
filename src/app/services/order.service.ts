import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable()
export class OrderService {
    private outForOrder:Subject<any> = new Subject();
    public _outForDeliveryList:Observable<any> = this.outForOrder.asObservable();
   constructor(private _http: HttpClient){

   }
  placeOrder(prescriptionData, userData, deliveryData){
    this.outForOrder.next("Test");
      return this._http.post(environment.apiUrl+'/placeOrder', {prescriptionData, userData, deliveryData});
  }
  outForDeliver(){
     
  }
  getProfileDetails(){
    return this._http.post(environment.apiUrl+'/getPharmacyProfileDetails', {instituteID : 14});
  }

}