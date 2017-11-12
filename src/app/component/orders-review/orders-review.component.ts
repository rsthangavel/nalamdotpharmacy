import { Component, OnInit, AfterViewInit, Inject, Input, Output, EventEmitter, OnChanges,SimpleChange, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
//import * as test from '../../../assets/js/timepicker.js';
//https://github.com/utatti/perfect-scrollbar
import { MatStepper, MatStepLabel } from '@angular/material';
import PerfectScrollbar from 'perfect-scrollbar';
import { OrderService } from '../../services/order.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DeliveryPersonService} from '../../services/deliveryperson.service';
declare var $:any;
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//https://codepen.io/Amirhossein/pen/NqErVE?limit=all&page=4&q=timepicker
@Component({
  selector: 'app-orders-review',
  templateUrl: './orders-review.component.html',
  styleUrls: ['./orders-review.component.css']
})
export class OrdersReviewComponent implements OnInit {
  @Input() userData;
  @Input() prescriptionData;
  @Output() orderplaced: EventEmitter<any> = new EventEmitter();
  // Only required when not passing the id in methods
  @ViewChild('stepper') private myStepper: MatStepper;
  addressUrl;
  totalPrice:number = 0;
  test;
  today = new Date();
  priceList;
  tableData:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
 // delieryPerson;
  constructor(private _formBuilder: FormBuilder, private _http:HttpClient, private _deliverService: DeliveryPersonService, private _orderService:OrderService) {}

  deliveryPerson: Observable<Array<any>>


  isNumber(e){
    
   
    if(/^[-+]?([0-9]{1,4}\.[0-9]{0,2}|[0-9]{1,4})$/.test(e.target.value+e.key)){
      return true;
    }
    else{
      return false;
    }
  }
  ngOnInit() {

    this._orderService._outForDeliveryList.subscribe(data=>{
      console.log(data);
    })
    //Change Total Price when user change value
    this.firstFormGroup.valueChanges.subscribe(res =>{
       console.log(res);
      this.totalPrice = 0;
      this.tableData.map(listres=>{
        if(res[listres.medname+'_quantity']){
       
          listres.quantity = res[listres.medname+'_quantity'];
        }
          listres.unitprice = res[listres.medname]; 
          listres.totalprice = listres.quantity*parseFloat(res[listres.medname]);
          listres.totalprice = Math.round(listres.totalprice*100)/100;
         if( listres.unitprice){
          if(listres.totalprice.toString().indexOf(".") == -1){
              listres.totalprice = listres.totalprice+'.00';
            }
         }
          listres.gst_percentage = Number(res[listres.medname+'_gst']);
        
          if(listres.totalprice){
            this.totalPrice += Number(listres.totalprice);
            this.totalPrice = Math.round(this.totalPrice*100)/100;
           }
      })
    
    });
    this.secondFormGroup = this._formBuilder.group({
       deliver_person   : ['', Validators.required],
       delivery_address : ['', Validators.required],
       ETA_date         : ['',Validators.required],
       ETA_time         : ['', Validators.required]
    })
    //Get Delivery Person Details
    // this.delieryPerson = this._deliverService.getDeliveryPerson();
    this.deliveryPerson = this._deliverService._deliverPersonList;  
   

    //Create Address from user address, used to redirect on Google Map
    this.addressUrl = 'https://maps.google.fr/maps?saddr='+this.userData.Address;
  }
 goNext(stepper: MatStepper){
   if(this.firstFormGroup.valid){
     stepper.next();
   }
   //stepper.next();
 }
  ngOnChanges(changes:any){
    //update user data when @Input changes
      console.log(changes);
      this.addressUrl = 'https://www.google.com/maps/search/?api=1&query='+changes.userData.currentValue.Address;
      let prescriptionList = JSON.parse(changes.userData.currentValue.prescriptionForm.Prescription);
      this.tableData = prescriptionList.prescription;
      this.firstFormGroup = this._formBuilder.group(changes.userData.currentValue.prescriptionForm.prescriptionForm);
      this.tableData.map(data=>{
        if(data.type == 'tablet'){
          data.quantity = (data.days)*(parseFloat(data.mor)+parseFloat(data.aft));
          data.gst_percentage = 12;
        }
        else{
          data.quantity = 1;
          data.gst_percentage = Number(12);
        }
      
        this.firstFormGroup.get(data.medname+'_quantity').setValue(data.quantity);
        this.firstFormGroup.get(data.medname+'_gst').setValue(12);
       // data.quantity = 2;
      });
      console.log(this.tableData);
      
      console.log(this.firstFormGroup);
  }
  addzeros(e){
    console.log(e.target.value)
    if(e.target.value != '' && e.target.value.indexOf(".") == -1){
      e.target.value = e.target.value+'.00';
    }
   
  }

  //Submit First Step Process for validation
  firstFormSubmit(value, valid){
    this.tableData = this.tableData.filter(res=>{
      if(res.unitprice){
        return true;
      }
      else{
        return false;
      }
    });
    this.tableData.gst_price = 0;
    this.tableData.med_price = 0;
    this.tableData.map(res=>{
      res.gst_price = Math.round(((res.gst_percentage/100)*res.totalprice)*100)/100;
      res.med_price = Math.round((res.totalprice - res.gst_price)*100)/100;
      this.tableData.gst_price += Number(res.gst_price);
      console.log(this.tableData);
      this.tableData.med_price += Number(res.med_price);
    });
      this.tableData.gst_price = Math.round((this.tableData.gst_price)*100)/100;
      this.tableData.med_price = Math.round((this.tableData.med_price)*100)/100;
    console.log(this.tableData);
   if(valid){
   
     this.tableData.totalPrice = this.totalPrice;
    
   }
  //  //add  individual prescription Price to prescription data for showing third step 
  //   this.tableData.map((data:any)=>{
  //     if(value[data.medname]){
  //       data.price = value[data.medname];
  //     }else{
  //       data.price = null;
  //     }
      
  //   });
  }
  secondFormSubmit(value,valid){
    this.secondFormGroup.get('ETA_time').setValue($('.timepicker').val())
    console.log(value);
  }

  //update prescription list when user change available slider
  isPrescriptionAvailable(event, formlist){
    console.log(event);
    if(event.checked == false){
      this.firstFormGroup.get(formlist.medname).setValue('notavailable');
      this.firstFormGroup.get(formlist.medname+'_gst').disable();
      this.firstFormGroup.get(formlist.medname+'_quantity').disable();
      this.firstFormGroup.get(formlist.medname).disable();
      this.firstFormGroup.get(formlist.medname).clearValidators();
    }
    else{
      this.firstFormGroup.get(formlist.medname).setValue('');
      this.firstFormGroup.get(formlist.medname).enable();
      this.firstFormGroup.get(formlist.medname+'_gst').enable()
      this.firstFormGroup.get(formlist.medname+'_quantity').enable()
      this.firstFormGroup.get(formlist.medname).setValidators([Validators.required, Validators.pattern('[0-9]+')]);
     // this.firstFormGroup.get('').updateValueAndValidity
    }

  //$('.prescription-list *').attr("disabled", "disabled").off('click');
  }
  // addQuantity(index,item){
  //  item.aft=1;
  //  item.quantity = (item.days)*(parseInt(item.mor)+parseInt(item.aft));
  //  return item;
  // }
  orderPlaced(){
    this._orderService.placeOrder(this.tableData, this.userData, this.secondFormGroup.value).subscribe(data=>{

    })
    this.orderplaced.emit(this.tableData);
  }
  ngAfterViewInit(){

    //console.log(mdtimepicker());
      // $('#timepicker').mdtimepicker({
      //   readOnly: true,   
      //   theme : 'teal'
      // }); //Initializes the time picker
      $('#timepicker').clockpicker({
        autoclose : true,
        twelvehour:true,
      
        
      });
     
    
    if(window.outerWidth <=768){
      $('.backicon_sm').show();
    }

    //add scroll effect to firststep form and third step review view
    const ps = new PerfectScrollbar('.mat-step--form');
    new PerfectScrollbar('.mat-step--review');
      }
      calldata(){
        this.secondFormGroup.get('ETA_time').setValue($('.timepicker').val())
      }
      show(){
        console.log("Success");
        $('.timepicker').trigger("click");
      }

      //hide and show review view when screen size is less than 768px
      showOrderlist(){
        $('#orderlist').show();
        $('.order-review').hide();
      }
      addNewDeliveryPerson(){
        console.log('clicked');
        $('.modal-backdrop').hide();
      }
    
}