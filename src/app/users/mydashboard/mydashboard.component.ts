import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import { Ng2MapModule} from 'ng2-map';

@Component({
    templateUrl: "./mydashboard.html",
})

export class mydashboardComponent implements OnInit{
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

    constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
        
        this.toasterService = toasterService;
        /***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        window.scrollTo(0, 0)
        /***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
    }

    ngOnInit(){
        $('#loader').show();
        this.solarService.getMydashboardData(<Solar>this.model).subscribe(results => {
            this.results=results;
            this.marketplace = results.MarketplaceProject;
            this.marketplaceLength=this.marketplace.length;
            this.trackproject = results.TrackedProject;
            this.trackProjectLength=results.TrackedProject.length;
            this.markets = results.Markets;
            this.markersMap=this.results.markers;
            this.marketLength=results.Markets.length;
            $('#loader').hide();
            if (this.results.success == "true") {
                this.message="Success";
               
//console.log(this.markersMap);                 //var locations;
        /*this.locations = [
            ['Bondi Beach', -33.890542, 151.274856, 1],
            ['Coogee Beach', -33.923036, 151.259052, 2],
            ['Cronulla Beach', -34.028249, 151.157507, 3],
            ['Manly Beach', -33.80010128657071, 151.28747820854187, 4],
            ['Maroubra Beach', -33.950198, 151.259302, 5]
        ];*/
        //var locations;
        var locations = new Array();
        locations=this.markersMap;

               // this.markersMap=JSON.stringify(this.markersMap);  

//console.log(this.locations[0][0]); 

//this.markersMap =  this.markersMap.substring(1, this.markersMap.length-1);
//this.markersMap = this.markersMap.split(",");

this.markersMap =JSON.parse(this.markersMap);
console.log(this.markersMap);
alert(typeof(this.markersMap));       

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: new google.maps.LatLng(-39.92, 151.25),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infowindow = new google.maps.InfoWindow();
        var marker, i;
        var markers = new Array();
        for (i = 0; i < locations.length; i++) { 
            this.marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: this.map
            });
            markers.push(this.marker);
            google.maps.event.addListener(this.marker, 'click', (function(marker, i) { 
                return function() {
                    this.infowindow.setContent(locations[i][0]);
                    this.infowindow.open(this.map, marker);
                }
            })(this.marker, i));
        }
 
         
        this.AutoCenter();


            } else {
                alert("Not added");
            }
        });
       
        
    }

    AutoCenter() {
            //  Create a new viewpoint bound
            var bounds = new google.maps.LatLngBounds();
            //  Go through each...
            $.each(this.markers, function (index, marker) {
                bounds.extend(marker.position);
            });
            //  Fit these bounds to the map
            this.map.fitBounds(bounds);
        }
        project_detail(id:any){
        alert(id);
        this.router.navigate(['/users/projectdetail'], { queryParams: { id: id } });
    }
}
	

