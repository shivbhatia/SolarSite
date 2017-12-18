import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import {ToasterModule, ToasterService} from 'angular2-toaster';
declare var google: any;

@Component({
  selector: 'dashboard',
  templateUrl: "./dashboard.html",
})

export class dashboardComponent implements OnInit{
	map:any;  
    markers :any;
    model: any = {};
    public message = '';
	results : any;
	blockAddress:any;
    totalReceived:any;
    totalSent:any;
    balance:any;
    unconfirmedBalance:any;
    finalBalance:any;
    private toasterService: ToasterService;
    userId:any;
	
	constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
		/***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        this.toasterService = toasterService;
        window.scrollTo(0, 0);
        /***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
		$("body").css('background-image', 'none');
	}
	
	ngOnInit(){
        this.userId = localStorage.getItem('token');
        if(this.userId==null){
            this.router.navigate(['login']);
        }
		$('#loader').show();
		this.solarService.originatorDashboard(<Solar>this.model).subscribe(results => {
            this.results = results;
            this.blockAddress = this.results.Addressdata.address;
            this.balance = this.results.Addressdata.results[0];
            this.markers=this.results;
            $('#loader').hide();
            if (this.results.success == "true") {
				/**** START CODE FOR GOOGLE MAP *****/
				var myLatLng = {lat: this.results.Userlat, lng: this.results.Userlng};
				var map = new google.maps.Map(document.getElementById('map'), {
					zoom: 4,
					center: myLatLng
				});
				var marker = new google.maps.Marker({
					position: myLatLng,
					map: map,
					title: 'Hello World!'
				});
				/**** END CODE FOR GOOGLE MAP *****/
			} else {
                this.toasterService.pop('error', 'Error in loading', '');
            }
		});
	}
}
