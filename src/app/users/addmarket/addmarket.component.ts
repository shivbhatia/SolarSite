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
        console.log("Address", place["address_components"][0]["long_name"]);
        $("#City").focus();
        $("#City").focusout();
        //$("#Country").click();
        this.model.city = place["address_components"][0]["long_name"];

    }
	
	ngOnInit(){
		console.log("testt");
	}
	
    AddMarket() {
        $('#mydiv').show();
        this.userService.addMarket(<User>this.model).subscribe(result => {
            this.result = result;
            if (result.success == true) {
                $('#mydiv').hide();
                this.toasterService.pop('success', 'Market Added Successfully', '');
                this.router.navigate(['/users/marketlisting']);
            } else {
                $('#mydiv').hide();
                this.toasterService.pop('error', 'Market could not be added '+result.message, '');
            }
        });
	}
 }
	

