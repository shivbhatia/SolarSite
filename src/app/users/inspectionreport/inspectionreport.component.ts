import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {DataTableModule,SharedModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';

@Component({
  templateUrl: "./inspectionreport.html",
})

export class inspectionreportComponent implements OnInit{
    model: any = {};
	result : any;
    token : any;
    public message = '';
    private toasterService: ToasterService;
    isLoading: boolean = false;
    
    constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService, private confirmationService: ConfirmationService) { 
        this.toasterService = toasterService;
    }
    
    ngOnInit(){
        $('#mydiv').show();
        this.solarService.getInspectionReport(<Solar>this.model).subscribe(result => {
            console.log(result);
            this.result = result;
            $('#mydiv').hide();
            if (result.success == true) {
                alert("User added"); 
                this.message="Success";
            } else {
                //alert("Not added");
            }
        });
    }

    edit_inspection(id:any){
        this.router.navigate(['/users/addsitevisit'], { queryParams: { id: id } });
    }

   

}
	

