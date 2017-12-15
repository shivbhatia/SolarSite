import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';import { NgForm } from '@angular/forms';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import { Ng2MapModule} from 'ng2-map';

@Component({
    templateUrl: "./projectdetail.html",
})

export class projectdetailComponent implements OnInit{
    model: any = {};
	results : any;
    marketplace:any;
    trackproject:any;
    markets:any;
    token : any;
    public message = '';
    private toasterService: ToasterService;
    isLoading: boolean = false;
    positions:any;
    map:any;
    mapOptions:any;
    bounds:any;
    markers:any;
    infoWindow:any;
    marker:any;
    locations:any;
    marketplaceLength:any;
    trackProjectLength:any;
    marketLength:any;
    userId:any;
    infowindow:any;
    i:any;
    markersMap:any;
    siteId:any;

    constructor(private router: Router,private activatedRoute: ActivatedRoute,private solarService: SolarService, toasterService: ToasterService) { 
        
        this.toasterService = toasterService;
        /***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        window.scrollTo(0, 0)
        /***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
    }

    ngOnInit(){
        this.siteId = this.activatedRoute.snapshot.queryParams["id"];
        $('#loader').show();
        this.solarService.getProjectDetail(<Solar>this.siteId).subscribe(results => {
            this.results=results;
            
            $('#loader').hide();
            if (this.results.success == "true") {
              console.log(this.results);
 


            } else {
                alert("Not added");
            }
        });
       
        
    }

    
}
	

