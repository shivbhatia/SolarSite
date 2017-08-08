import { Component,ViewEncapsulation,OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';

import {DataTableModule,SharedModule} from 'primeng/primeng';
import {TooltipModule} from "ng2-tooltip";
import { FileUploader } from 'ng2-file-upload';

import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

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
  fileNamesNew: string = null;

  Structurefiles:any;
  Electricalfiles:any;
  Utilityfiles:any;


  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options1: Object = {
    url: 'http://localhost:10050/upload'
  };
  sizeLimit = 2000000;
    

  constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService,private http:Http) { 
    this.toasterService = toasterService;
  }

  public options = {types: ['address'],componentRestrictions: { country: 'US' }}
    getAddress(place:Object) {       
           console.log("Address", place);
    }
  

  ngOnInit(){
    
  }




  onStructuralFileSelect(event) { 
    this.Structurefiles = event.srcElement.files;
    let fileNames = [];
    for (let i=0; i<this.Structurefiles.length; i++) {
      fileNames.push(this.Structurefiles[i].name);
    }
    this.fileNames = fileNames.join();
    console.log(this.fileNames);

    console.log(this.Structurefiles);

        let formData:FormData = new FormData();
        formData.append('uploadFile[]', this.Structurefiles, this.fileNames);

let headers = new Headers();
            //headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log(formData);
        console.log(options);
        this.http.post('http://192.155.246.146:8145/users/add_inspection_angular', formData, options)
            .map(res => res)
            .catch(error => Observable.throw(error))
            .subscribe(
                data =>{
                    console.log(data);
                },
                error =>{
                    console.log(error);
                }
            )
    }



  

  onElectricalFileSelect(event) { 
    this.Electricalfiles = event.srcElement.files;
    let fileNamesNew = [];
    for (let i=0; i<this.Electricalfiles.length; i++) {
      fileNamesNew.push(this.Electricalfiles[i].name);
    }
    this.fileNamesNew = fileNamesNew.join();
    console.log(this.fileNames);

    console.log(this.Electricalfiles);
  }

   onUtilityFileSelect(event) { 
    this.Utilityfiles = event.srcElement.files;
    let fileNamesNew = [];
    for (let i=0; i<this.Utilityfiles.length; i++) {
      fileNamesNew.push(this.Utilityfiles[i].name);
    }
    this.fileNamesNew = fileNamesNew.join();
    console.log(this.fileNames);

    console.log(this.Utilityfiles);
  }

  AddSiteVisit() {
        console.log("checkout");
        //console.log(this.Structurefiles);
        //console.log(this.Electricalfiles);
        //console.log(this.Utilityfiles);
      //  this.model['StructureFiles']=this.Structurefiles;
      //  this.model['ElectricalFiles']=this.Electricalfiles;
      //  this.model['UtilityFiles']=this.Utilityfiles;
        //console.log(files3);
       
let uploads;

 const formData: FormData = new FormData();

//let input = new FormData();
    //input.append("file", fileToUpload);


for (let i = 0; i < this.Structurefiles.length; i++) { console.log(this.Structurefiles[i]);
        //const formData = new FormData();
        formData.append("uploads[]", this.Structurefiles, this.Structurefiles.name);
      }
console.log("testing");
console.log(formData);
//console.log(uploads);


         $('#mydiv').show();
           this.solarService.addsitevisit(<Solar>this.model).subscribe(result => {
          //console.log(result);
          this.result = result;
            //alert(typeof result);

            if (result.success == true) {
              //alert("User added");
              //alert(result.type); 
              this.message="Success";
              $('#mydiv').hide();
              if(result.type=='company'){ 
                  this.toasterService.pop('success', 'Please make payment', '');
                  localStorage.setItem('token', result.token);
                  this.router.navigate(['/users/checkout']);
                }else{
                  this.toasterService.pop('success', 'Successfully Registered', '');
                  this.router.navigate(['/users/login']);
              }
            } else {
              alert("Not added");
            }
          });
          
    }
  



  
  


}
	

