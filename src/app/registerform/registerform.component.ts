import { Component,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'registerform',
  templateUrl: "./registerform.html",
  styleUrls:['../../assets/cssregisterform/bootstrap.min.css','../../assets/cssregisterform/font-awesome.css','../../assets/cssregisterform/style.css'],
  //encapsulation: ViewEncapsulation.None,
  
})

export class RegisterformComponent{
	model: any = {};
	result : any;
	message:string;

	private toasterService: ToasterService;
	
	constructor(private router: Router) { 
		
	}


  ngOnInit(){
  }

   public options = {types: ['address'],componentRestrictions: { country: 'US' }}
    getAddress(place:Object) {       
           console.log("Address", place);
    }
  


}
	

