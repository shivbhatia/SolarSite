import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'register',
  templateUrl: "./register.html",
  styleUrls:['../../assets/cssnew/bootstrap.min.css'],
  
})

export class RegisterComponent{
	model: any = {};
	result : any;
	message:string;

	private toasterService: ToasterService;
	
	constructor(private router: Router,private userService: UserService, toasterService: ToasterService) { 
		this.toasterService = toasterService;
	}


  ngOnInit(){
  }

   public options = {types: ['address'],componentRestrictions: { country: 'US' }}
    getAddress(place:Object) {       
           console.log("Address", place);
    }
    
   register() {
        console.log("register");
        this.userService.create(<User>this.model).subscribe(result => {
        	console.log(result);
          this.result = result;
            alert(typeof result);

            if (result.success == true) {
              alert("User added"); 
              this.message="Success";
               //this.errorMsg = 'Failed to login';

 			
            this.toasterService.pop('success', 'Args Title', 'Args Body');

              this.router.navigate(['/users/registration']);
            } else {
              alert("Not added");
            }
          });
    }




}
	

