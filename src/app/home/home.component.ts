import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {OwlCarousel} from 'ng2-owl-carousel';


//import { navbarFixedComponent } from "../layout/homelayout/navbar-fixed/navbarFixed.component";

//import { FormBuilder, Validators } from '@angular/forms';

//import { SolarService } from '../services/solar.service';
//import { Observable } from 'rxjs';
//import { Subject } from 'rxjs/Subject';
//import { Solar } from '../models/solar.model';

//import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'homepage',
  templateUrl: "./home.html",
  styleUrls:['./css/bootstrap.css'],
  
})

export class HomeComponent implements OnInit {
  //@Output() navbar = new EventEmitter();
	model: any = {};
	results : any;
  //navbar:any;
  // message:string;
  public message = '';
  //data: Object = {};
	constructor(private router: Router) {
    window.scrollTo(0, 0)
    //this.navbar.emit({navbar:"false"});
    //this.nav=false;
   }

  ngOnInit(){
   /* this.solarService.get(<Solar>this.model).subscribe(results => {
          this.results = results;
            console.log(results);
            if (results.success == true) {
              alert("User added"); 
              this.message="Success";
               //this.errorMsg = 'Failed to login';
             // this.router.navigate(['/login']);
            } else {
              //alert("Not added");
            }
          });*/




  }

    
    }
	

