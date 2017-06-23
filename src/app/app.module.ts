import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ng2-owl-carousel';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from "./app.routes";
import { HOME_DECLARATIONS } from "./home/index";


@NgModule({
  declarations: [
    AppComponent,
    ...HOME_DECLARATIONS,
  ],
  imports: [
    BrowserModule,
    OwlModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
