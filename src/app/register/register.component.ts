import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: "./register.html",
  styleUrls: ['../../assets/css/register/custom.css']
})

export class RegisterComponent{
	constructor(private router: Router) { 
	}

  ngOnInit(){
  }
}
	

