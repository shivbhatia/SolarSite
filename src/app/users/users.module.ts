import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomFormsModule } from 'ng2-validation'
import { OwlModule } from 'ng2-owl-carousel';
//import { ChartModule } from 'angular2-highcharts';

//import { Ng2SmartTableModule } from 'ng2-smart-table';
//import {NgxPaginationModule} from 'ngx-pagination';
//import { ToastModule, ToastOptions } from 'ng2-toastr';
//import { CustomOption } from './../custom-option';

import { usersComponent } from './users.component';
import { dashboardheaderComponent } from './dashboardheader/dashboardheader.component';
import { usersfooterComponent } from './usersfooter/usersfooter.component';
import { dashboardComponent } from './dashboard/dashboard.component';
import { marketplaceComponent } from './marketplace/marketplace.component';
//import { CFInvestmentModule } from './cf_investment/cf_investment.module';
//import { MainHeaderComponent } from './main-header/main-header.component';
//import { MainSideComponent } from './main-side/main-side.component';
//import { FooterComponent } from './footer/footer.component';


//import { homemenuComponent } from './homemenu/homemenu.component';
//import { homebannerComponent } from './homebanner/homebanner.component';
//import { homefeatureComponent } from './homefeature/homefeature.component';
//import { homeclientComponent } from './homeclient/homeclient.component';
//import { homecustomerComponent } from './homecustomer/homecustomer.component';
//import { homefooterComponent } from './homefooter/homefooter.component';



//import { UsersComponent } from './users/users.component';
//import { AddUserComponent } from './users/add-user/adduser.component';
//import { ProfileComponent } from './profile/profile.component';
//import { cashFlowInvestmentComponent } from './cash-flow-investment/cash-flow-investment.component';



//import { ActiveRouteGuard } from './../services/activate-route-guard';
//import { DeactiveRouteGuard } from './../services/deactivate-route-guard';


//import { UserService,AdminService,CommonService } from './../services/index';

import {DataTableModule} from 'primeng/primeng';

import { routing } from './users.routing';
declare var require: any;
@NgModule({
	imports:[
		FormsModule,
		ReactiveFormsModule,
		CustomFormsModule,
		CommonModule,
		routing,
		OwlModule,
		//Ng2SmartTableModule,
		//NgxPaginationModule,
		//ToastModule.forRoot(),
		DataTableModule
	],
	declarations:[
		usersComponent,
		dashboardheaderComponent,
		usersfooterComponent,
		dashboardComponent,
		marketplaceComponent,
		
		//homemenuComponent,
		//homebannerComponent,
		//homefeatureComponent,
		//homeclientComponent,
		//homecustomerComponent,
		//homefooterComponent,
		
		//MainHeaderComponent,
		//MainSideComponent,
		//FooterComponent,
		//UsersComponent,
		//ProfileComponent,
		//cashFlowInvestmentComponent,
		//AddUserComponent
	],
	providers:[
		//ActiveRouteGuard,
		//DeactiveRouteGuard,
		//UserService,
		//AdminService,
		//CommonService,
		//{provide: ToastOptions, useClass: CustomOption}
	]
})

export class UsersModule{}