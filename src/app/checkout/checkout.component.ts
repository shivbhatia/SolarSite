import { Component,ViewEncapsulation } from '@angular/core';
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
	message:string;
  private toasterService: ToasterService;
  isLoading: boolean = false;
  
  constructor(private router: Router,private userService: UserService, toasterService: ToasterService) { 
    this.toasterService = toasterService;

  }


  ngOnInit(){
  }

   checkout() {
        console.log("checkout");
         $('#mydiv').show();
          this.userService.create(<User>this.model).subscribe(result => {
          //console.log(result);
          this.result = result;
            //alert(typeof result);

            if (result.success == true) {
              //alert("User added"); 
              this.message="Success";
              $('#mydiv').hide();
              this.toasterService.pop('success', 'Successfully Registered', '');
              this.router.navigate(['/users/login']);
            } else {
              alert("Not added");
            }
          });
          
    }
  


}
	

