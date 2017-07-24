import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';

import {DataTableModule,SharedModule} from 'primeng/primeng';



@Component({
  //selector: 'marketplace',
  templateUrl: "./marketplace.html",
  //styleUrls:['../../assets/cssregisterform/bootstrap.min.css','../../assets/cssregisterform/font-awesome.css','../../assets/cssregisterform/stylenew.css'],
  //encapsulation: ViewEncapsulation.None,
  
})

export class marketplaceComponent implements OnInit{
  model: any = {};
	result : any;
  token : any;
  public message = '';
  private toasterService: ToasterService;
  isLoading: boolean = false;
    

  constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
    this.toasterService = toasterService;
  }


  ngOnInit(){
    //alert("register");

   // this.token=localStorage.getItem('token');

    this.solarService.get(<Solar>this.model).subscribe(result => {
          this.result = result;
            console.log(result);
            if (result.success == true) {
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
	

