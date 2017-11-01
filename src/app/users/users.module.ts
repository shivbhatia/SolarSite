import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomFormsModule } from 'ng2-validation'
import { OwlModule } from 'ng2-owl-carousel';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { Ng2CompleterModule } from "ng2-completer";
//import { TooltipModule } from 'angular2-tooltips';

//import { ChartModule } from 'angular2-highcharts';

//import { Ng2SmartTableModule } from 'ng2-smart-table';
//import {NgxPaginationModule} from 'ngx-pagination';
//import { ToastModule, ToastOptions } from 'ng2-toastr';
//import { CustomOption } from './../custom-option';

import { usersComponent } from './users.component';
import { dashboardheaderComponent } from './dashboardheader/dashboardheader.component';
import { breadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { usersfooterComponent } from './usersfooter/usersfooter.component';
import { dashboardComponent } from './dashboard/dashboard.component';
import { marketplaceComponent } from './marketplace/marketplace.component';
import { mydashboardComponent } from './mydashboard/mydashboard.component';
import { quickinspectionComponent } from './quickinspection/quickinspection.component';
import { addsitevisitComponent } from './addsitevisit/addsitevisit.component';
import { addmarketComponent } from './addmarket/addmarket.component';
import { editprofileComponent } from './editprofile/editprofile.component';
import { sitevisitlistingComponent } from './sitevisitlisting/sitevisitlisting.component';
import { marketlistingComponent } from './marketlisting/marketlisting.component';
import { inspectionreportComponent } from './inspectionreport/inspectionreport.component';
import { mytrackedprojectsComponent } from './mytrackedprojects/mytrackedprojects.component';
import { mysolarprojectsComponent } from './mysolarprojects/mysolarprojects.component';
import { transfertokensComponent } from './transfertokens/transfertokens.component';
import { tokenlistingComponent } from './tokenlisting/tokenlisting.component';



import { NguiMapModule} from '@ngui/map';

//import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';


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

import {DataTableModule,ConfirmDialogModule, ConfirmationService, SharedModule} from 'primeng/primeng';
import {TooltipModule} from "ng2-tooltip";
//import {DatePickerModule} from 'ng2-datepicker-bootstrap';
import { Ng2UploaderModule } from 'ng2-uploader';

import { routing } from './users.routing';
declare var require: any;

//https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBXmez0sxIsSJlo99zh4APGgjieSlQ8TJ0

@NgModule({
	imports:[
		FormsModule,
		ReactiveFormsModule,
		CustomFormsModule,
		CommonModule,
		routing,
		OwlModule,
		GooglePlaceModule,
		Ng2CompleterModule,
		//NKDatetimeModule,
		Ng2DatetimePickerModule,
		Ng2UploaderModule,
		
		//DatePickerModule,
		//TooltipModule,
		NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM' +
      '&libraries=visualization,places,drawing',
    }),
		//Ng2SmartTableModule,
		//NgxPaginationModule,
		//ToastModule.forRoot(),
		DataTableModule,
		ConfirmDialogModule,
    SharedModule,
		TooltipModule
	],
	declarations:[
		usersComponent,
		dashboardheaderComponent,
		usersfooterComponent,
		dashboardComponent,
		marketplaceComponent,
		mydashboardComponent,
		quickinspectionComponent,
		addsitevisitComponent,
		addmarketComponent,
		sitevisitlistingComponent,
		inspectionreportComponent,
		mytrackedprojectsComponent,
		mysolarprojectsComponent,
		marketlistingComponent,
		editprofileComponent,
		transfertokensComponent,
		tokenlistingComponent,
		breadcrumbComponent,
		
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
	providers:[ ConfirmationService
		//ActiveRouteGuard,
		//DeactiveRouteGuard,
		//UserService,
		//AdminService,
		//CommonService,
		//{provide: ToastOptions, useClass: CustomOption}
	]
})

export class UsersModule{}