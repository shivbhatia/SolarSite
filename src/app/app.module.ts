import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwlModule } from 'ng2-owl-carousel';
import { Select2Module } from 'ng2-select2';
import { HttpModule } from '@angular/http';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2SmartTableModule,LocalDataSource } from 'ng2-smart-table';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { NguiMapModule} from '@ngui/map';

import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from "./app.routes";
//import { HOME_DECLARATIONS } from "./home/index";
//import { REGISTER_DECLARATIONS } from "./register/index";
//import { REGISTERNEW_DECLARATIONS } from "./registernew/index";
//import { REGISTERFORM_DECLARATIONS } from "./registerform/index";
//import { CHECKOUT_DECLARATIONS } from "./checkout/index";
//import { LOGIN_DECLARATIONS } from "./login/index";
//import { DASHBOARD_DECLARATIONS } from "./dashboard/index";
import { UserService } from "./services/user.service";
import { SolarService } from "./services/solar.service";

import { HomeModule } from './home/home.module';
import { registerComponent } from './register/register.component';
import { loginComponent } from './login/login.component';
import { checkoutComponent } from './checkout/checkout.component';
import { UsersModule } from './users/users.module';


import {DataTableModule,ConfirmDialogModule, ConfirmationService, SharedModule} from 'primeng/primeng';
//import {DatePickerModule} from 'ng2-datepicker-bootstrap';
//import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

//import { TooltipModule } from 'angular2-tooltips';

import {GooglePlaceModule} from 'ng2-google-place-autocomplete';

import {TooltipModule} from "ng2-tooltip";

import { Ng2UploaderModule } from 'ng2-uploader';


@NgModule({
  declarations: [
    AppComponent,
    registerComponent,
    loginComponent,
    checkoutComponent,
    //...HOME_DECLARATIONS,
    //...REGISTER_DECLARATIONS,
   // ...REGISTERNEW_DECLARATIONS,
   // ...REGISTERFORM_DECLARATIONS,
   // ...LOGIN_DECLARATIONS,
    //...DASHBOARD_DECLARATIONS,
    //...CHECKOUT_DECLARATIONS,
    
    
    //newcheckoutComponent,
    //newdashboardComponent,
  ],
  imports: [
    BrowserModule,
    OwlModule,
    GooglePlaceModule,
    ToasterModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    Ng2FilterPipeModule,
    Ng2DatetimePickerModule,
    Ng2UploaderModule,
    //NKDatetimeModule,
    //DatePickerModule,
    //TooltipModule,
    TooltipModule,
    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM' +
      '&libraries=visualization,places,drawing',
    }),

    BrowserAnimationsModule,
    Select2Module,
    CustomFormsModule,
    HttpModule,
    FormsModule,
    HomeModule,
    UsersModule,
    DataTableModule,
    ConfirmDialogModule,
    SharedModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService,SolarService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
