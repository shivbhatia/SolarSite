import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';

import {DataTableModule,SharedModule} from 'primeng/primeng';
import {TooltipModule} from "ng2-tooltip";
import { FileUploader } from 'ng2-file-upload';



@Component({
  //selector: 'marketplace',
  templateUrl: "./addsitevisit.html",
  
  //styleUrls:['../../assets/cssregisterform/bootstrap.min.css','../../assets/cssregisterform/font-awesome.css','../../assets/cssregisterform/stylenew.css'],
  //encapsulation: ViewEncapsulation.None,
  
})

export class addsitevisitComponent implements OnInit{
  model: any = {};
	result : any;
  token : any;
  public message = '';
  private toasterService: ToasterService;
  isLoading: boolean = false;
  fileNames: string = null;



  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options1: Object = {
    url: 'http://localhost:10050/upload'
  };
  sizeLimit = 2000000;
    

  constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService) { 
    this.toasterService = toasterService;
  }

  public options = {types: ['address'],componentRestrictions: { country: 'US' }}
    getAddress(place:Object) {       
           console.log("Address", place);
    }
  

  ngOnInit(){
    
  }


  handleUpload(data): void { console.log(data);
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;

    }
  }
 
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }



  onFileSelect(event) { 
    let files = event.srcElement.files;
    let fileNames = [];
    for (let i=0; i<files.length; i++) {
      fileNames.push(files[i].name);
    }
    this.fileNames = fileNames.join();
    console.log(this.fileNames);

    console.log(files);
  }

  /*AddSiteVisit() {
        console.log("checkout");
         $('#mydiv').show();
          this.solarService.checkout(<User>this.model).subscribe(result => {

           //console.log(result);
          this.result = result;
            //alert(typeof result);

            if (result.success == true) {
              //alert("User added"); 
              this.message="Success";
              $('#mydiv').hide();
              this.toasterService.pop('success', 'Thank you for choosing Solar Site Design for Commercial Marketplace Partnership.Congratulation You have been registered with us.Please check your mail to complete the registration process.', '');
              this.router.navigate(['/users/login']);
            } else {
              alert("Not added");
            }
          });
          
    }*/
  



  
  


}
	

