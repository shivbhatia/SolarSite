import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'login',
  templateUrl: "./login.html",
  styleUrls:['../../assets/cssregisterform/bootstrap.min.css','../../assets/cssregisterform/font-awesome.css','../../assets/cssregisterform/style.css'],
  
})

export class LoginComponent{
	model: any = {};
	result : any;
	message:string;

	private toasterService: ToasterService;
	
	constructor(private router: Router,private userService: UserService, toasterService: ToasterService) { 
   // if(localStorage.getItem('token')!=null){
    //  this.router.navigate(['/users/dashboard']);
   // }
		this.toasterService = toasterService;
	}


  ngOnInit(){
  }

   
    
   login() {
        this.userService.login(<User>this.model).subscribe(result => {
        	this.result = result;
            if (result.success == true) {
              //alert("User added"); 
              //alert(result.token);
              this.message="Success";
               //this.errorMsg = 'Failed to login';

 			      localStorage.setItem('token', result.token);
            this.toasterService.pop('success', 'Congratulations!!!', 'You have successfully logged in!!!');

              this.router.navigate(['/users/dashboard']);
            } else {
              alert("Not added");
            }
          });
    }




}
	

