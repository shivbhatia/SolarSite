import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';

import { Ng2MapModule} from 'ng2-map';






@Component({
  //selector: 'marketplace',
  templateUrl: "./mydashboard.html",
  
  //styleUrls:['../../assets/cssregisterform/bootstrap.min.css','../../assets/cssregisterform/font-awesome.css','../../assets/cssregisterform/stylenew.css'],
  //encapsulation: ViewEncapsulation.None,
  
})

export class mydashboardComponent implements OnInit{
  model: any = {};
	results : any;
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
  
    

  constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
    this.toasterService = toasterService;



  }


  ngOnInit(){
    $('#mydiv').show();
    this.solarService.getMydashboardData(<Solar>this.model).subscribe(results => {
          this.results = results;
            console.log(results.MarketplaceProject);
this.markers=this.results;
            $('#mydiv').hide();
            if (results.success == true) {
              alert("User added"); 
              this.message="Success";
               //this.errorMsg = 'Failed to login';
             // this.router.navigate(['/login']);
            } else {
              //alert("Not added");
            }
          });

    var locations;
    locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];
 
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-39.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
 
    var infowindow = new google.maps.InfoWindow();
 
    var marker, i;
    var markers = new Array();
 
    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
 
      markers.push(marker);
 
      google.maps.event.addListener(marker, 'click', (function(marker, i) { 
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
 
    function AutoCenter() {
      //  Create a new viewpoint bound
      var bounds = new google.maps.LatLngBounds();
      //  Go through each...
      $.each(markers, function (index, marker) {
      bounds.extend(marker.position);
      });
      //  Fit these bounds to the map
      map.fitBounds(bounds);
    }
    AutoCenter();


  }

  

  
  


}
	

