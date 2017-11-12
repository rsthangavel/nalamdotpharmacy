import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {
  isProfileVisible:boolean = false;
  InsName: string = 'Nalam Pharma';
  pharmacy = [{MobileNumer: ''}];
  CountryList:Array<Object>;
  StateList:Array<Object>;
  CityList:Array<Object>;
  constructor(private _http: HttpClient, private _orderService: OrderService) { 
    
  }

  ngOnInit() {
    this._orderService.getProfileDetails().subscribe((data:Array<any>)=>{
      this.pharmacy = data[0];
    });
  
    this._http.post(environment.apiUrl+'/getCountryMaster','').subscribe((data:Array<any>)=> {
      this.CountryList = data;
    });
    this._http.post(environment.apiUrl+'/getStateMaster',{countryID: 1}).subscribe((data:Array<any>)=>{
      this.StateList = data;
    });
    this._http.post(environment.apiUrl+'/getCityMaster',{stateID: 24}).subscribe((data:Array<any>)=>{
      this.CityList = data;
    });
  }

}
