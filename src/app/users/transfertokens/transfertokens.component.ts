import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {TooltipModule} from "ng2-tooltip";
import { FileUploader } from 'ng2-file-upload';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  templateUrl: "./transfertokens.html",
})

export class transfertokensComponent implements OnInit{
	model: any = {};
	results : any;
    addData : any;
	token : any;
	public message = '';
	private toasterService: ToasterService;
    CompleterItem:any;
    protected searchStr: string;
    protected dataService: CompleterData;
    protected searchData : any = {};
	
  	constructor(private completerService: CompleterService,private router: Router,private activatedRoute: ActivatedRoute,private solarService: SolarService, toasterService: ToasterService,private http:Http) { 
	    this.toasterService = toasterService;
        this.solarService.getEmailIds(<Solar>this.model).subscribe(results => {
            this.results = results;
            $('#mydiv').hide();
            this.searchData=this.results.Userdata;
            this.dataService = completerService.local(this.searchData, 'email', 'email');
        });

        /***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        
        window.scrollTo(0, 0)

        /***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
    }

	ngOnInit(){
	    $('#mydiv').show();
        this.solarService.originatorDashboard(<Solar>this.model).subscribe(results => {
            this.results = results;
            $('#mydiv').hide();
            if (this.results.success == "true") {
                this.model.from_address = results.Addressdata.address;
                this.model.privateKey=results.Userdata.User.block_token_private_key
                this.message="Success";
            } else {
                alert("Not added");
            }
        });	
    }
	
	getBlockAddressByEmail(value){
        $('#mydiv').show();
        this.solarService.getEmailAddress(<Solar>value.title).subscribe(addData => {
            this.addData = addData;
            $('#mydiv').hide(); 
            if (this.results.success == "true") {  
                this.model.to_address=this.addData.Userdata[0].User.block_token_address;
                //this.model.privateKey=this.addData.Userdata[0].User.block_token_private_key;
                this.message="Success";
            } else {
                alert("Not added");
            }
        }); 
    }

    TransferTokens(){
        console.log(this.model);
        $('#mydiv').show();
        this.solarService.transferTokens(<Solar>this.model).subscribe(results => {
            this.results = results;
            if (this.results.success == "true") {
                $('#mydiv').hide();
                this.toasterService.pop('success', 'Token Transfered Successfully', '');
                //this.router.navigate(['/users/marketlisting']);
            } else {
                $('#mydiv').hide();
                this.toasterService.pop('error', 'Market could not be added '+results.message, '');
            }
        });
    }
}
	

