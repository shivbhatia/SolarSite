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
  templateUrl: "./editprofile.html",
})

export class editprofileComponent implements OnInit{
    model: any = {};
	result : any;
	token : any;
	public message = '';
	private toasterService: ToasterService;
    public userId:any;
	
    constructor(private router: Router,private activatedRoute: ActivatedRoute,private userService: UserService, toasterService: ToasterService,private http:Http) { 
	   this.toasterService = toasterService;
		
        /***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        
        window.scrollTo(0, 0)

        /***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
    }

	public options = {types: ['(cities)'],componentRestrictions: { country: 'US' }}
    getAddress(place:Object) {    
        if(place["address_components"][0]["long_name"]!=''){
            $("#City").val(place["address_components"][0]["long_name"]);
            $("#City").prop('disabled', true);
        }
        if(place["address_components"][2]["long_name"]!=''){
            $("#State").val(place["address_components"][2]["long_name"]);
            $("#State").prop('disabled', true);
        }
        if(place["address_components"][3]["long_name"]!=''){
            $("#Country").val(place["address_components"][3]["long_name"]);
            $("#Country").prop('disabled', true);
        }
    }
	
	ngOnInit(){  
        this.userId = localStorage.getItem('token');
        if(this.userId==null){
            this.router.navigate(['/login']);
        }
        if(this.userId!=undefined){  
            $('#mydiv').show();
            this.userService.editProfile(<User>this.userId).subscribe(result => {
                this.result = result;
                $('#mydiv').hide();
                this.model.company_name=result.userData.User.company_name;
                this.model.first_name=result.userData.User.firstname;
                this.model.last_name=result.userData.User.lastname;
                this.model.email=result.userData.User.email;
                this.model.business_phone=result.userData.User.business_phone;
                this.model.phone=result.userData.User.phone;
                this.model.website=result.userData.User.website;
                this.model.route=result.userData.User.route;
                this.model.city=result.userData.User.city;
                this.model.state=result.userData.User.state;
                this.model.zip=result.userData.User.zip;
                this.model.country=result.userData.User.country;
            });
        }
    }
	
    editUser() {
        $('#mydiv').show();
        this.userService.editUser(<User>this.model).subscribe(result => {
            this.result = result;
            if (result.success == true) {
                $('#mydiv').hide();
                this.toasterService.pop('success', 'Profile Updated Successfully', '');
            } else {
                this.toasterService.pop('error', 'Profile could not be updated', '');
            }
        });
	}
}
	

