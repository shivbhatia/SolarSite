import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
	selector:'register',
	templateUrl:'./register.html',
	styleUrls:['../../assets/cssregisterform/bootstrap.min.css',
				'../../assets/cssregisterform/font-awesome.css',
				'../../assets/cssregisterform/stylenew.css'
				],
	 
})

export class registerComponent implements OnInit {
	model: any = {};
	result : any;
  token : any;
	message:string;
  private toasterService: ToasterService;
  isLoading: boolean = false;
  
  constructor(private router: Router,private userService: UserService, toasterService: ToasterService) { 
  	document.body.style.backgroundImage = "url('../../assets/img/Home-User/banner.jpg')";
    this.toasterService = toasterService;
    
/***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        
        window.scrollTo(0, 0)

/***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/

  }


  ngOnInit(){
     
  }

   register() {
        console.log("register");
         $('#mydiv').show();

          this.userService.create(<User>this.model).subscribe(result => {
          //console.log(result);
          this.result = result;
            //alert(typeof result);

            if (result.success == true) {
              //alert("User added");
              //alert(result.type); 
              this.message="Success";
              $('#mydiv').hide();
              if(result.type=='company'){ 
                  this.toasterService.pop('success', 'Please make payment', '');
                  localStorage.setItem('token', result.token);
                  this.router.navigate(['/users/checkout']);
                }else{
                  this.toasterService.pop('success', 'Successfully Registered', '');
                  this.router.navigate(['/users/login']);
              }
            } else {
              alert("Not added");
            }
          });
          
    }
  

}