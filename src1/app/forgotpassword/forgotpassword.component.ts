import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'forgotpassword',
  templateUrl: "./forgotpassword.html",
  styleUrls:['../../assets/cssregisterform/bootstrap.min.css','../../assets/cssregisterform/font-awesome.css','../../assets/cssregisterform/stylenew.css'],
  
})

export class forgotpasswordComponent{
	model: any = {};
	result : any;
	message:string;

	private toasterService: ToasterService;
	
	constructor(private router: Router,private userService: UserService, toasterService: ToasterService) { 
   // if(localStorage.getItem('token')!=null){
    //  this.router.navigate(['/users/dashboard']);
   // }
		this.toasterService = toasterService;
    document.body.style.backgroundImage = "url('../../assets/img/Home-User/banner.jpg')";
	}


  ngOnInit(){
  }

   
    
   forgotpassword() {
        this.userService.forgotpassword(<User>this.model).subscribe(result => {
        	this.result = result;
            if (result.success == true) { //console.log(result);
              //alert("User added"); 
              //alert(result.token);
              //this.message="Success";
               //this.errorMsg = 'Failed to login';

 			      //localStorage.setItem('token', result.token);
            //localStorage.setItem('firstname', result.firstname);
            //localStorage.setItem('lastname', result.lastname);
            this.toasterService.pop('success', 'Congratulations!!!', result.message);

              this.router.navigate(['/login']);
            } else {
              this.toasterService.pop('error', 'Failure!!!', result.message);
            }
          });
    }




}
	

