import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';



@Component({
  selector: 'checkout',
  templateUrl: "./checkout.html",
  styleUrls:['../../assets/cssregisterform/bootstrap.min.css','../../assets/cssregisterform/font-awesome.css','../../assets/cssregisterform/style.css'],
  //encapsulation: ViewEncapsulation.None,
  
})

export class CheckoutComponent{
  model: any = {};
	result : any;
  token : any;
  plans:any;
plansId:any;
plansName:any;
price:any;
plans_array: any[];
	message:string;
  private toasterService: ToasterService;
  isLoading: boolean = false;
  currYear: number;
  monthList: number[] = [];
  yearList: number[] = [];

  public options = {types: ['address'],componentRestrictions: { country: 'US' }}
    getAddress(place:Object) {       
           console.log("Address", place);
    }
  
  constructor(private router: Router,private userService: UserService, toasterService: ToasterService) { 
    this.toasterService = toasterService;


   



    this.currYear = Number(new Date().getFullYear());
    for (let i=this.currYear; i<=(this.currYear+10); i++) {
      this.yearList.push(i);
    }
    for (let i=1; i<=12; i++) {
      this.monthList.push(i);
    }
  }


  ngOnInit(){
     this.userService.get_plans(<User>this.model).subscribe(plans => {
          this.plans = plans;
          if (plans) {
            console.log("test"+plans[0]._attributes.id);
            this.plansId=plans[0]._attributes.id;
            this.plansName=plans[0]._attributes.name;
            this.price=plans[0]._attributes.price;
           
this.plans_array=[plans[0]._attributes.id,plans[0]._attributes.name,plans[0]._attributes.price]
           // alert(this.plansId);
           // alert(this.plansName);
           // alert(this.price);
            
              //alert(plans[0]._attributes);
            } 
          });
  }

   checkout() {
        console.log("checkout");
         $('#mydiv').show();
         this.model.plansId=this.plansId;
         this.model.plansName=this.plansName;
         this.model.price=this.price;
         //this.token = localStorage.getItem(this.token);

         this.userService.checkout(<User>this.model).subscribe(result => {

           //console.log(result);
          this.result = result;
            //alert(typeof result);

            if (result.success == true) {
              //alert("User added"); 
              this.message="Success";
              $('#mydiv').hide();
              this.toasterService.pop('success', 'Thank you for choosing Solar Site Design for Commercial Marketplace Partnership.Congratulation You have been registered with us.Please check your mail to complete the registration process.', '');
              this.router.navigate(['/users/login']);
            } else {
              alert("Not added");
            }
          });
          
    }
  


}
	

