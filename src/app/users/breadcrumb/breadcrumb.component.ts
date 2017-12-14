import { Component , ViewChild} from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { ToasterModule, ToasterService} from 'angular2-toaster';

import { marketplaceComponent } from '../marketplace/marketplace.component';
	
@Component({
 	selector: 'breadcrumb',
 	templateUrl: "./breadcrumb.html",
 	//directives : [marketplaceComponent],
 	providers: [marketplaceComponent]
})

export class breadcrumbComponent {
	@ViewChild(marketplaceComponent) private MarketplaceComponent:marketplaceComponent;

	headerTitle:any;
	breadcrumbLink:any;
	currentUrl:any;
	private sum: number;
   

	
	constructor(private router:Router,toasterService: ToasterService,private route:ActivatedRoute, public marketPlace: marketplaceComponent){
		//console.log(this.totalRecords);
		this.sum = this.marketPlace.sum; 
		//alert(this.sum);
		this.router.events.subscribe(path => {
			if(path instanceof NavigationEnd) {
				this.currentUrl= path.url;
    			if(this.currentUrl=='/users/marketplace'){
					this.headerTitle='Commercial Marketplace Dashboard - Updated Daily';
					this.breadcrumbLink='Solar Marketplace';
				}else if(this.currentUrl=='/users/mydashboard'){
					this.headerTitle='Commercial Marketplace Dashboard - My Projects';
					this.breadcrumbLink='My Dashboard';
				}else if(this.currentUrl=='/users/dashboard'){
					this.headerTitle='Originator Dashboard';
					this.breadcrumbLink='Originator Dashboard';
				}else if(this.currentUrl=='/users/addsitevisit'){
					this.headerTitle='Add Site Visit';
					this.breadcrumbLink='Add Site Visit';
				}else if(this.currentUrl=='/users/sitevisitlisting'){
					this.headerTitle='Manage Inspections';
					this.breadcrumbLink='Manage Inspections';
				}else if(this.currentUrl=='/users/inspectionreport'){
					this.headerTitle='Manage Reports';
					this.breadcrumbLink='Manage Reports';
				}else if(this.currentUrl=='/users/tokenlisting'){
					this.headerTitle='Token Listing';
					this.breadcrumbLink='Token Listing';
				}else if(this.currentUrl=='/users/editprofile'){
					this.headerTitle='Update Profile';
					this.breadcrumbLink='Update Profile';
				}else if(this.currentUrl=='/users/marketlisting'){
					this.headerTitle='Market Listing';
					this.breadcrumbLink='Market Listing';
				}else{
					this.headerTitle='';
					this.breadcrumbLink='';
				}
			}
  		});
	}
}
