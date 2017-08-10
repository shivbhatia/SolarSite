import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
    templateUrl: "./marketplace.html",
})

export class marketplaceComponent implements OnInit{
    model: any = {};
    result : any;
    token : any;
    public message = '';
    private toasterService: ToasterService;
    isLoading: boolean = false;
    pageLinks:any;
    rowsPerPageOptions: number[] = [];
    perPage:number=0;  
    recordsPerPage:number=25;

    constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
        this.toasterService = toasterService;
    }

    ngOnInit(){
        $('#mydiv').show();
        this.solarService.get(<Solar>this.model).subscribe(result => {
            this.result = result;
            this.pageLinks=Math.ceil(result.length/this.recordsPerPage);
            for (let i=1; i<=this.pageLinks; i++) {
                this.perPage=this.perPage+this.recordsPerPage;
                this.rowsPerPageOptions.push(this.perPage);
            }
            $('#mydiv').hide();
            if (result.success == true) {
                alert("User added"); 
            } else {
              //alert("Not added");
            }
        });
    }
}
	

