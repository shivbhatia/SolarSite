import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { DataTableModule,SharedModule} from 'primeng/primeng';
import { TooltipModule} from "ng2-tooltip";
import { FileUploader } from 'ng2-file-upload';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  templateUrl: "./addmarket.html",
})

export class addmarketComponent implements OnInit{
	model: any = {};
	result : any;
	token : any;
	public message = '';
	private toasterService: ToasterService;
	
    constructor(private router: Router,private activatedRoute: ActivatedRoute,private userService: UserService, toasterService: ToasterService,private http:Http) { 
	   this.toasterService = toasterService;
		
        /***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        
        window.scrollTo(0, 0)

        /***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
    }

	public options = {types: ['(cities)'],componentRestrictions: { country: 'US' }}
        getAddress(place:Object) {   
        console.log("Address", place);
    }
	
	ngOnInit(){
		
	}
	
    AddMarket() {
        alert("register");
        $('#mydiv').show();
        this.userService.addMarket(<User>this.model).subscribe(result => {
          this.result = result;
          if (result.success == true) {
              //alert("User added");
              //alert(result.type); 
              //this.message="Success";
              $('#mydiv').hide();
              //if(result.type=='company'){ 
                  this.toasterService.pop('success', 'Market Added Successfully', '');
                  //localStorage.setItem('token', result.token);
                 // this.router.navigate(['/users/checkout']);
               // }else{
                //  this.toasterService.pop('success', 'Successfully Registered', '');
               //   this.router.navigate(['/users/login']);
              //}
            } else {
               this.toasterService.pop('error', 'Market could not be added', '');
            }
          });
		
    }
 }
	

