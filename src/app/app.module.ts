import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwlModule } from 'ng2-owl-carousel';
import { Select2Module } from 'ng2-select2';
import { HttpModule } from '@angular/http';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from "./app.routes";
import { HOME_DECLARATIONS } from "./home/index";
import { REGISTER_DECLARATIONS } from "./register/index";
import { REGISTERNEW_DECLARATIONS } from "./registernew/index";
import { REGISTERFORM_DECLARATIONS } from "./registerform/index";
import { UserService } from "./services/user.service";

import {GooglePlaceModule} from 'ng2-google-place-autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    ...HOME_DECLARATIONS,
    ...REGISTER_DECLARATIONS,
    ...REGISTERNEW_DECLARATIONS,
    ...REGISTERFORM_DECLARATIONS,
  ],
  imports: [
    BrowserModule,
    OwlModule,
    GooglePlaceModule,
    ToasterModule,
    BrowserAnimationsModule,
    Select2Module,
    CustomFormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
