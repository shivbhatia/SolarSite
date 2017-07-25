import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'dashboardheader',
  templateUrl: "./dashboardheader.html",
  //styleUrls:['../../../assets/css/home/style.css'],

})

export class dashboardheaderComponent {
	private toasterService: ToasterService;
	currentUrl:any;
	firstname:string;
	lastname:string;
	constructor(private router:Router,toasterService: ToasterService){
		this.toasterService = toasterService;
		this.firstname=localStorage.getItem('firstname');
		this.lastname=localStorage.getItem('lastname');
		
	}
	logout(){
      localStorage.removeItem('token');
      this.toasterService.pop('success', 'Congratulations!!!', 'You have successfully logged out!!!');
      this.router.navigate(['/login']);
    }
}
