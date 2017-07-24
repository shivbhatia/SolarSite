import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
declare var google: any;
@Component({
  selector: 'newdashboard',
  templateUrl: "./newdashboard.html",
  //styleUrls:['../../assets/css/dashboard/bootstrap.css','../../assets/css/dashboard/sb-admin.css','../../assets/css/dashboard/font-awesome.css'],
  
})

export class newdashboardComponent implements OnInit{
	model: any = {};
	result : any;
	message:string;

    map:any;
       markers :any;
  data:any;

	private toasterService: ToasterService;
	
	constructor(private router: Router,private userService: UserService, toasterService: ToasterService) { 
		this.toasterService = toasterService;
	}


  ngOnInit(){

    var myLatLng = {lat: 42.8997702, lng: -78.7890054};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });


  }

   public options = {types: ['address'],componentRestrictions: { country: 'US' }}
    getAddress(place:Object) {       
           console.log("Address", place);
    }
    
   login() {
        this.userService.login(<User>this.model).subscribe(result => {
        	this.result = result;
            if (result.success == true) {
              alert("User added"); 
              alert(result.token);
              this.message="Success";
               //this.errorMsg = 'Failed to login';

 			      localStorage.setItem('token', result.token);
            this.toasterService.pop('success', 'Args Title', 'Args Body');

              this.router.navigate(['/users/dashboard']);
            } else {
              alert("Not added");
            }
          });
    }

    logout(){
      localStorage.removeItem('token');
      this.toasterService.pop('success', 'Congratulations!!!', 'You have successfully logged out!!!');
      this.router.navigate(['/users/login']);
    }




}
	

