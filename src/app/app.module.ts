import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ng2-owl-carousel';
import { Select2Module } from 'ng2-select2';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from "./app.routes";
import { HOME_DECLARATIONS } from "./home/index";
import { REGISTER_DECLARATIONS } from "./register/index";
import { REGISTERNEW_DECLARATIONS } from "./registernew/index";


@NgModule({
  declarations: [
    AppComponent,
    ...HOME_DECLARATIONS,
    ...REGISTER_DECLARATIONS,
    ...REGISTERNEW_DECLARATIONS,
  ],
  imports: [
    BrowserModule,
    OwlModule,
    Select2Module,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
