import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {OwlCarousel} from 'ng2-owl-carousel';

@Component({
  selector: 'homeclient',
  templateUrl: "./homeclient.html",
  styleUrls:['../../../assets/css/home/style.css'],
})
export class homeclientComponent {
	images: Array<string> = new Array(6);
    baseUrl: string = '../../../../assets/img/Home-User/';
    client:string='client-';
	constructor(private router: Router) {
    
   }
}
