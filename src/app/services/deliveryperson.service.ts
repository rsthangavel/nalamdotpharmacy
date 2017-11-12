import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';
import { environment } from '../../environments/environment';
@Injectable()
export class DeliveryPersonService {
    public deliver_person =[{'Name':'Ragu'}];
    public _deliverPerson:BehaviorSubject<any> = new BehaviorSubject<Array<Object>>(this.deliver_person);
    public _deliverPersonList:Observable<any> = this._deliverPerson.asObservable();
constructor(private _http:HttpClient){
    this._http.post(environment.apiUrl+'/getDeliverPerson', "").subscribe((response:Array<Object>)=>{
        console.log( this._deliverPerson);
        let test = JSON.stringify(response);
        console.log(test);
       // this._deliverPerson.next({'Name':'Ragu'});
        response.map((list:any)=>{
            this.deliver_person.push(list);
        })
     
      
    });
   
}

createPerson(data){
   this._http.post(environment.apiUrl+'/createDeliverPerson', {data})
   .subscribe((data:any)=>{
    
    this.deliver_person.push(data);
   })
}

getDeliveryPerson() {
   // console.log(this.deliver_person);
  
    console.log(this.deliver_person);
    return Observable.interval(2200).map(i=> this.deliver_person )

     // return this._http.post(environment.apiUrl+'/getDeliverPerson',"")
    //  .subscribe((arg:any) => {this._deliverPerson = arg});
}
updatePerson(){

}
deletePerson(){

}
}