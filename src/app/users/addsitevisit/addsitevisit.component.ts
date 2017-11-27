import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import { DataTableModule,SharedModule } from 'primeng/primeng';
import { TooltipModule } from "ng2-tooltip";
import { FileUploader } from 'ng2-file-upload';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  templateUrl: "./addsitevisit.html",
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
	files: FileList;
	uploadFile: any;
	
	
	sizeLimit = 2000000;

    StructuralfilesToUpload: Array<File>;
    ElectricalfilesToUpload: Array<File>;
    UtilityfilesToUpload: Array<File>;
    filesUpload: Array<File>;
    StructuralfileInputNames: string;
    ElectricalfileInputNames: string;
    UtilityfileInputNames: string;
    siteId:any;
	
	constructor(private router: Router,private activatedRoute: ActivatedRoute,private solarService: SolarService, toasterService: ToasterService,private http:Http) { 
		this.toasterService = toasterService;
		this.StructuralfilesToUpload = [];
        this.ElectricalfilesToUpload = [];
        /***** START CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        
        window.scrollTo(0, 0)

/***** END CODE TO SET FOCUS ON TOP AFTER CLICK ON NAVIGATION LINK *****/
        
	}

	public options = {types: ['address'],componentRestrictions: { country: 'US' }}
	getAddress(place:Object) {       
		console.log("Address", place);
        //console.log(place["address_components"][0]["types"][0])

        if(place["address_components"][0]){
            if(place["address_components"][0]["long_name"]!='' && place["address_components"][0]["types"][0]=='route'){
                $("#Address").val(place["address_components"][0]["long_name"]);
                $("#Address").prop('disabled', true);
            }
        }

        if(place["address_components"][1]){
            if(place["address_components"][1]["long_name"]!='' && (place["address_components"][1]["types"][0]=='locality' || place["address_components"][1]["types"][1]=='sublocality')){
                $("#City").val(place["address_components"][1]["long_name"]);
                $("#City").prop('disabled', true);
            }
        }

        if(place["address_components"][2]){
            if(place["address_components"][2]["long_name"]!='' && (place["address_components"][2]["types"][0]=='locality' || place["address_components"][2]["types"][1]=='sublocality')){
                $("#City").val(place["address_components"][2]["long_name"]);
                $("#City").prop('disabled', true); 
            }
            if(place["address_components"][2]["types"][0]=='administrative_area_level_1'){
                $("#State").val(place["address_components"][2]["long_name"]);
                $("#State").prop('disabled', true);
            }
        }

        if(place["address_components"][3]){
            if(place["address_components"][3]["types"][0]=='administrative_area_level_1'){
                $("#State").val(place["address_components"][3]["long_name"]);
                $("#State").prop('disabled', true);
            } 
            
            if(place["address_components"][3]["long_name"]!='' && place["address_components"][3]["types"][0]=='country'){
                $("#Country").val(place["address_components"][3]["long_name"]);
                $("#Country").prop('disabled', true);
            }else{
                $("#Country").val('');
                $("#Country").prop('disabled', false);
            } 
        }

        if(place["address_components"][4]){ 
            if(place["address_components"][4]["long_name"]!='' && place["address_components"][4]["types"][0]=='administrative_area_level_1'){
                $("#State").val(place["address_components"][4]["long_name"]);
                $("#State").prop('disabled', true);
            }
            if(place["address_components"][4]["types"][0]=='administrative_area_level_1'){
                $("#State").val(place["address_components"][4]["long_name"]);
                $("#State").prop('disabled', true);
            } 
            if(place["address_components"][4]["long_name"]!='' && place["address_components"][4]["types"][0]=='country'){ 
                $("#Country").val(place["address_components"][4]["long_name"]);
                $("#Country").prop('disabled', true);

            }else{
                $("#Country").val('');
                $("#Country").prop('disabled', false);
            }
        }

        if(place["address_components"][5]){
            if(place["address_components"][5]["long_name"]!='' && place["address_components"][5]["types"][0]=='country'){
                $("#Country").val(place["address_components"][5]["long_name"]);
                $("#Country").prop('disabled', true);
            }
            if(place["address_components"][5]["long_name"]!='' && place["address_components"][5]["types"][0]=='postal_code'){
                $("#Zip").val(place["address_components"][5]["long_name"]);
                $("#Zip").prop('disabled', true);
            }
        }

        if(place["address_components"][6]){
            if(place["address_components"][6]["long_name"]!='' && place["address_components"][6]["types"][0]=='postal_code'){
                $("#Zip").val(place["address_components"][6]["long_name"]);
                $("#Zip").prop('disabled', true);
            }else{
                $("#Zip").val('');
                $("#Zip").prop('disabled', false);
            }
        }
    }
	
	ngOnInit(){
		this.siteId = this.activatedRoute.snapshot.queryParams["id"];
		if(this.siteId!=undefined){  
			//console.log(this.siteId);
			$('#mydiv').show();
			this.solarService.editSiteVisit(<Solar>this.siteId).subscribe(result => {
            	this.result = result;
            	$('#mydiv').hide();
            	console.log(result);
            	
            	this.model.relationship=result.Site.relationship;
            	this.model.project_name=result.Site.project_name;
            	this.model.projectContact=result.Site.projectContact;
            	this.model.contactEmail=result.Site.contactEmail;
            	this.model.contactPhone=result.Site.contactPhone;
            	this.model.address=result.Site.address;
            	this.model.city=result.Site.city;
            	this.model.state=result.Site.state;
            	this.model.zip=result.Site.zip;
            	this.model.country=result.Site.country;
            	this.model.survey_date=result.Site.survey_date;
            	this.model.installation_date=result.Site.installation_date;
            	this.model.electric_utility_provider=result.Site.electric_utility_provider;
            	this.model.utility_bill_cost=result.Site.utility_bill_cost;
            	this.model.home_type=result.Site.home_type;
            	this.model.projectData_comment=result.Site.projectData_comment;
            	this.model.building_voltage=result.Site.building_voltage;
            	this.model.breaker_space=result.Site.breaker_space;
            	this.model.installData_comment=result.Site.installData_comment;
            	this.model.panel_rating=result.Site.panel_rating;
            	this.model.panel_manufacturer=result.Site.panel_manufacturer;
            	this.model.roof_age=result.Site.roof_age;
            	this.model.designInfo_comment=result.Site.designInfo_comment;


            	if (result.success == true) {
                	alert("User added"); 
                	this.message="Success";
            	} else {
                	//alert("Not added");
            	}
        	});
		}else{ console.log("thththththt");
			
		}
	}
	
	onFileSelect(event: EventTarget) {
		let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
		let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
		this.files = target.files;
	}

	sendFilesToServer() { 
		/*this.http.post('http://localhost/test.php', this.files)
            .map(res => res)
            .catch(error => Observable.throw(error))
            .subscribe(
                data =>{
                    console.log(data);
                },
                error =>{
                    console.log(error);
                }
            );*/
		let formData:FormData = new FormData();
		for (var i = 0; i < this.files.length; i++) { console.log(this.files[i]);
			formData.append('filesList[]', this.files[0], this.files[0].name);
		}
		let headers = new Headers();
        /*
            this was the culprit:
            headers.append('Content-Type', 'multipart/form-data');
            worked for me by changing it to:
        */
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        /*  var xhr = new XMLHttpRequest();
			xhr.open('POST', "http://localhost/test.php");
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					console.log("Files Uploaded")
				}
			}
		xhr.send(formData);*/
	}

	onStructuralFileSelect(event) { 
		this.Structurefiles = event.srcElement.files;
		let fileNames = [];
		for (let i=0; i<this.Structurefiles.length; i++) {
			fileNames.push(this.Structurefiles[i].name);
		}
		this.fileNames = fileNames.join();
		let formData:FormData = new FormData();
        formData.append('uploadFile[]', this.Structurefiles, this.fileNames);
		let headers = new Headers();
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log(formData);
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
    }

	onUtilityFileSelect(event) { 
		this.Utilityfiles = event.srcElement.files;
		let fileNamesNew = [];
		for (let i=0; i<this.Utilityfiles.length; i++) {
			fileNamesNew.push(this.Utilityfiles[i].name);
		}
		this.fileNamesNew = fileNamesNew.join();
    }

	AddSiteVisitOld() {
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
		$('#mydiv').show();
		this.solarService.addsitevisit(<Solar>this.model).subscribe(result => {
			this.result = result;
			if (result.success == true) {
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
  

/******** Final Code ******/

	AddSiteVisit() {
		console.log("testing");
		//console.log(this.filesUpload);
       // this.filesUpload=this.StructuralfilesToUpload.concat(this.StructuralfilesToUpload);
      //alert();
       window.scrollTo(0, 0);    
       $('#mydiv').show();
        //this.makeFileRequest("http://192.155.246.146:8145/users/add_inspection_angular", this.model, this.StructuralfilesToUpload,  this.ElectricalfilesToUpload, this.UtilityfilesToUpload).then((result) => {
            this.makeFileRequest("https://www.solarsitedesign.com/webservicesangular/add_inspection", this.model, this.StructuralfilesToUpload,  this.ElectricalfilesToUpload, this.UtilityfilesToUpload).then((result) => {
            //console.log(result);
            $('#mydiv').hide();
            this.toasterService.pop('success', 'Successfully Added', '');
                  //this.router.navigate(['/users/sitevisitlisting']);
        }, (error) => {
            console.error(error);
        });

    }
 
	StructuralfileChangeEvent(StructuralfileInput: any){ 
		this.StructuralfilesToUpload = <Array<File>> StructuralfileInput.target.files;
        let fileNamesNew = [];
        for (let i=0; i<this.StructuralfilesToUpload.length; i++) {
            fileNamesNew.push(this.StructuralfilesToUpload[i].name);
        }
        this.StructuralfileInputNames = fileNamesNew.join();
    }

    ElectricalfileChangeEvent(ElectricalfileInput: any){ 
        this.ElectricalfilesToUpload = <Array<File>> ElectricalfileInput.target.files;
        let ElectrialfileNamesNew = [];
        for (let i=0; i<this.ElectricalfilesToUpload.length; i++) {
            ElectrialfileNamesNew.push(this.ElectricalfilesToUpload[i].name);
        }
        this.ElectricalfileInputNames = ElectrialfileNamesNew.join();
    }

    UtilityfileChangeEvent(UtilityfileInput: any){ 
        this.UtilityfilesToUpload = <Array<File>> UtilityfileInput.target.files;
        let UtilityfileNamesNew = [];
        for (let i=0; i<this.UtilityfilesToUpload.length; i++) {
            UtilityfileNamesNew.push(this.UtilityfilesToUpload[i].name);
        }
        this.UtilityfileInputNames = UtilityfileNamesNew.join();
    }
 
    makeFileRequest(url: string, postData: any, Structuralfiles: Array<File>, Electricalfiles: Array<File>, Utilityfiles: Array<File>) {
		
		console.log(postData);
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            
            if(Structuralfiles.length>0){ 
                for(var i = 0; i < Structuralfiles.length; i++) { 
                    formData.append("StructuralUploads[]", Structuralfiles[i], Structuralfiles[i].name);
                }
            }
            console.log('formDataStr '+formData);

            if(Electricalfiles.length>0){
                for(var i = 0; i < Electricalfiles.length; i++) {
                    formData.append("ElectricUploads[]", Electricalfiles[i], Electricalfiles[i].name);
                }
            }
            if(Utilityfiles.length>0){
                for(var i = 0; i < Utilityfiles.length; i++) {
                    formData.append("UtilityUploads[]", Utilityfiles[i], Utilityfiles[i].name);
                }
            }


			if(postData !=="" && postData !== undefined && postData !==null){
				for (var property in postData) {
					if (postData.hasOwnProperty(property)) {
						formData.append(property, postData[property]);
					}
				}
			}
            //const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') });
            //const options = new RequestOptions({ headers: headers })
			xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve((xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            console.log(formData);
            xhr.open("POST", url,true);
            xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(formData);
        });
    }
}
	

