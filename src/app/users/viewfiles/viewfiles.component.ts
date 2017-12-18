import { Component,ViewEncapsulation,OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers,RequestOptions,ResponseContentType} from '@angular/http';
import {DataTableModule,SharedModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import { saveAs } from 'file-saver/FileSaver';

import {BrowserModule, DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

import {Popup} from 'ng2-opd-popup';

@Component({
  templateUrl: "./viewfiles.html",
})

export class viewfilesComponent implements OnInit{
    model: any = {};
	result : any;
    token : any;
    private toasterService: ToasterService;
	pageLinks:any;
	recordsPerPage:number=10;
	perPage:number=0;  
	rowsPerPageOptions: number[] = [];
	siteId:any;
    popupResult:any;
	shared_link:any;
	Ifreme:any;
	proId:any;
	proProjectName:any;
	proFileType:any;
	proFileName:any;
	profolderId:any;
	
    constructor(private router: Router,private activatedRoute: ActivatedRoute,private solarService: SolarService, toasterService: ToasterService, private confirmationService: ConfirmationService, private http: Http , private popup:Popup, private sanitizer: DomSanitizer) { 
        this.toasterService = toasterService;
        this.sanitizer=sanitizer;
    }
    
    ngOnInit(){
	this.siteId = this.activatedRoute.snapshot.queryParams["id"]; 
	
        $('#mydiv').show();
        this.solarService.getSiteFiles(<Solar>this.siteId).subscribe(result => {
            this.result = result;
            //console.log(this.result);
            //alert(this.result);
            this.pageLinks=Math.ceil(this.result.length/this.recordsPerPage);
            for (let i=1; i<=this.pageLinks; i++) {
                this.perPage=this.perPage+this.recordsPerPage;
                this.rowsPerPageOptions.push(this.perPage);
            }
            $('#mydiv').hide();
        });
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
	
	 popUp(id:any,projectName:any,fileName:any,fileType:any,folderId:any) {  
	 
	// alert(fileName);
        $('#mydiv').show();
        //this.model.fileName=fileName;
        //this.model.folderId=folderId;

        this.model = {
            fileName: fileName,
            folderId: folderId
        };


        
         $('#mydiv').show();
        this.solarService.getSharedLink(<Solar>this.model).subscribe(popupResult => {
            this.popupResult = popupResult; 
            this.shared_link=this.popupResult.expiring_embed_link.url; 
            this.Ifreme=this.sanitizer.bypassSecurityTrustResourceUrl(this.shared_link);
            this.popup.options = {
                header: "Popup",
                color: "#5cb85c", // red, blue.... 
                widthProsentage: 40, // The with of the popou measured by browser width 
                animationDuration: 1, // in seconds, 0 = no animation 
                showButtons: true, // You can hide this in case you want to use custom buttons 
                confirmBtnContent: "Download", // The text on your confirm button 
                cancleBtnContent: "Cancel", // the text on your cancel button 
                confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
                cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
                animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
            };
            this.proId=id;
            this.proProjectName=projectName;
            this.proFileType=fileType;
            this.proFileName=fileName;
            this.profolderId=folderId;
            this.popup.show(this.popup.options); 
            $('#mydiv').hide();
        });
    }

   
}
	

