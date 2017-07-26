import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';




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
    

  constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
    this.toasterService = toasterService;
  }


  ngOnInit(){
    $('#mydiv').show();
    this.solarService.getMydashboardData(<Solar>this.model).subscribe(results => {
          this.results = results;
            console.log(results);
            
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




  }

  
  


}
	

