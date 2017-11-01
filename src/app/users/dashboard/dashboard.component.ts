import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import {ToasterModule, ToasterService} from 'angular2-toaster';

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
	
	constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
		/***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        this.toasterService = toasterService;
        window.scrollTo(0, 0);
        /***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
		$("body").css('background-image', 'none');
	}
	
	ngOnInit(){
		$('#mydiv').show();
		this.solarService.originatorDashboard(<Solar>this.model).subscribe(results => {
            this.results = results;
            //console.log(this.results);
            this.blockAddress = this.results.Addressdata.address;
            this.balance = this.results.Addressdata.results[0];
            this.markers=this.results;
            $('#mydiv').hide();
            if (this.results.success == "true") {
                this.message="Success";
            } else {
                alert("Not added");
            }
        });
        /**** START CODE FOR GOOGLE MAP *****/
		var myLatLng = {lat: 42.8997702, lng: -78.7890054};
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
	}
}
