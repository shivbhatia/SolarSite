import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: "./register.html",
  styleUrls:['../../assets/cssnew/bootstrap.min.css'],
  
})

export class RegisterComponent{
	model: any = {};
	constructor(private router: Router) { 
	}

  ngOnInit(){
  }
}
	

