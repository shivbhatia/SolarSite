import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {DataTableModule,SharedModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';

@Component({
  templateUrl: "./sitevisitlisting.html",
})

export class sitevisitlistingComponent implements OnInit{
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
        this.solarService.getSiteVisit(<Solar>this.model).subscribe(result => {
            this.result = result;
            //alert(this.result);
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

    edit_inspection(id:any){
        this.router.navigate(['/users/addsitevisit'], { queryParams: { id: id } });
    }

    delete_inspection(id:any) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this inspection?',
            accept: () => {
                $('#mydiv').show();
                this.solarService.deleteInspection(<Solar>id).subscribe(result => {
                    this.result = result;
                    if (result.success == true) { 
                        this.toasterService.pop('success', 'Successfully deleted', '');
                        $('#mydiv').hide();
                        this.ngOnInit();
                    } else {
                        $('#mydiv').hide();
                        this.toasterService.pop('error', 'Error in deletion', '');
                    }
                });
            }
        });
        
    }

}
	

