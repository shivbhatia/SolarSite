import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class DeactiveRouteGuard implements CanActivate {

    constructor(private router : Router) { }

    canActivate() {
  	
  	    let token = localStorage.getItem('access_token');
        let logged_type = localStorage.getItem('logged_type');
   
        if(token && logged_type=="ADMIN") {
          return true;
        } else {
          this.router.navigate(['/login']);
        }
    }  
}