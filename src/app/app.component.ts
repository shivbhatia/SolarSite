import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {OwlCarousel} from 'ng2-owl-carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, private route: ActivatedRoute){}
  isHomePage() { 
    if (this.router.url == '/') {
      return true;
    }
    
  }
}
