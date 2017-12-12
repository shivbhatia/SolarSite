import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'login',
    templateUrl: "./login.html",
    styleUrls:['../../assets/cssregisterform/bootstrap.min.css','../../assets/cssregisterform/font-awesome.css','../../assets/cssregisterform/stylenew.css'],
})

export class loginComponent{
    model: any = {};
	result : any;
	message:string;
    private toasterService: ToasterService;
	
    constructor(private router: Router,private userService: UserService, toasterService: ToasterService) { 
        if(localStorage.getItem('token')!=null){
            this.router.navigate(['/users/dashboard']);
        }
		this.toasterService = toasterService;
        document.body.style.backgroundImage = "url('../../assets/img/Home-User/banner.jpg')";
	}
    
    ngOnInit(){
    }

    login() {
        $('#loader').show();
        this.userService.login(<User>this.model).subscribe(result => {
            this.result = result;
            if (result.success == true) { 
                this.message="Success";
                localStorage.setItem('token', result.token);
                localStorage.setItem('firstname', result.firstname);
                localStorage.setItem('lastname', result.lastname);
                this.toasterService.pop('success', 'Congratulations!!!', 'You have successfully logged in!!!');
                this.router.navigate(['/users/dashboard']);
            } else {
              this.toasterService.pop('error', 'Failure!!!', 'you have entered wrong data!!!');
            }
        });
        $('#loader').hide();
    }
}
	

