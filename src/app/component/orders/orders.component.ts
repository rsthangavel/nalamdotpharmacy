import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//https://github.com/utatti/perfect-scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import {MatSnackBar} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DeliveryPersonService} from '../../services/deliveryperson.service';
declare var $:any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  currentUser;
  addEffect: false;
  hightlightStatus: Array<boolean> = [];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  deliverypersonFormGroup : FormGroup;
  test= {};
  message;
  success = true;
  //container = document.querySelector('.orderlist .col-md-12');
  user:Array<Object> = [{Name:"Thangavel", MobileNumber: 9999999999}];
  constructor(private _formBuilder   : FormBuilder, 
              public snackBar        : MatSnackBar, 
              private _http          : HttpClient,
              private _deliverService: DeliveryPersonService) { }

  
  ngOnInit() {
    this._deliverService._deliverPersonList.subscribe((data:any) => {
      console.log(data);
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.deliverypersonFormGroup = this._formBuilder.group({
      Name          : ['', Validators.required],
      mobile_number : ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(10), Validators.minLength(10)])],
      address       : ['', Validators.required],
      age           : ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(2), Validators.maxLength(2)])],
      gender        : ['', Validators.required]
    });   
  }

  deliveryPersonFormSubmit(value, valid){
    console.log(value);
    if(valid){
      this._deliverService.createPerson(value)
      // .subscribe((data:any)=>{
      //   console.log(JSON.parse(data));
      //   this._deliverService._deliverPerson.next(data);
      //   console.log(this._deliverService._deliverPersonList);
      // });
     // this._deliverService;
      $('#deliverpersonModal').modal('hide');
    }
   
  }
  openSnackBar() {
    this.snackBar.open('oh! you clicked it wrong, No problem!','UNDO' , {
      duration: 5000,
    });
  }
  connect() {
    console.log("connect");
    $('.btn').addClass('loading');
    $('.btn').off('click', this.connect);
    this.misteryMessage;
    setTimeout(this.misteryMessage, 2000);
  }
  
misteryMessage(){
 
  this.success = true;
  this.message = (this.success) ? 'success' : 'error';
  $('.message-' + this.message).addClass('active');
  setTimeout(function(){
    $('.btn').removeClass('loading');
  }, 500);
  this.success = !this.success;
}

closeMessage() {
  console.log(this.message);
  $('.message-success').removeClass('active');
  $('.btn').on('click', this.connect);
}

  ngAfterViewInit(){  
    $('.btn').on('click', this.connect);
     $('.mat-tab-body-content').css('min-height', '400px');
    this._http.post(environment.apiUrl+'/getPharmacyPrescription', {instituteID : 14}).subscribe((data:Array<any>)=>{
      this.user = data.reverse();
    })
    const ps = new PerfectScrollbar('#orderlist');
    $('.mat-tab-body-content').css('background', '#f3f3f3');
  }
  removeOrder(data){
    console.log(data);
    this.currentUser = null;
    this.openSnackBar();
   
  }
  orderplaced(data){
    console.log(this.currentUser.OPID);
    console.log(this.user);
    setTimeout(this.misteryMessage, 1000);
  
    this.user = this.user.filter((list:any)=>{
      console.log(list.OPID);
      if(list.OPID == this.currentUser.OPID) { return false ;}else{ return true;}
   })
   this.currentUser = null;
  }
  testdata(data, data2){
    this.test = data2;
this.currentUser = data;
this.currentUser.prescriptionForm = data2;
  }
  selectedOrderReview(i, data){
   if(window.outerWidth <= 768){
     $('#orderlist').hide();
     $('.order-review').show();
   }
  
    this.hightlightStatus = [];
    this.hightlightStatus[i] = !this.hightlightStatus[i];
  
    this._http.post(environment.apiUrl+'/getOPPrescription', {OPID: data.OPID}).subscribe((res:any)=>{
      let temp = JSON.parse(res.Prescription);
      //console.log("Temp",temp);
      
      temp.prescription.map((data:any, index)=>{
     
      
        //let temp = index;
              //   temp = ['', Validators.required];
                 this.test[data.medname] = ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{0,4}.\?[0-9]{1,2}')])];
                 this.test[data.medname+'_gst'] = ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+\.?[0-9]{1,2}')])];
                 this.test[data.medname+'_quantity'] = ['', Validators.compose([Validators.required, Validators.pattern('^[1-9]+'), Validators.maxLength(4)])];
      });
    
      res.prescriptionForm = this.test;
      console.log(res);
      this.testdata(data, res);
})  
  }
}
//https://codepen.io/Paolo-Duzioni/pen/zPrqQy