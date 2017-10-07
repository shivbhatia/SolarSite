import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {DataTableModule,SharedModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';

@Component({
  templateUrl: "./tokenlisting.html",
})

export class tokenlistingComponent implements OnInit{
    model: any = {};
	result : any;
    token : any;
    public message = '';
    private toasterService: ToasterService;
    isLoading: boolean = false;
    pageLinks:any;
    rowsPerPageOptions: number[] = [];
    perPage:number=0;  
    recordsPerPage:number=10;

    
    constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService, private confirmationService: ConfirmationService) { 
        this.toasterService = toasterService;
    }
    
    ngOnInit(){
        $('#mydiv').show();
        this.solarService.getTokenTransactions(<Solar>this.model).subscribe(result => {
            this.result = result;
            this.pageLinks=Math.ceil(result.length/this.recordsPerPage);
            for (let i=1; i<=this.pageLinks; i++) {
                this.perPage=this.perPage+this.recordsPerPage;
                this.rowsPerPageOptions.push(this.perPage);
            }
            $('#mydiv').hide();
            if (result!='') { 
                this.message="Success";
            } else {
                //alert("Not added");
            }
        });
    }

    

}
	

