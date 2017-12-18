import { Component,ViewEncapsulation,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    applicationsUrl:any;
imgSrc:any;
proId:any;
proProjectName:any;
proFileType:any;
proFileName:any;
videoSource:any;
shared_link:any;
str:any;
popupResult:any;
Ifreme:any;
profolderId:any;
downloadResult:any;
    
    constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService, private confirmationService: ConfirmationService, private http: Http , private popup:Popup, private sanitizer: DomSanitizer) { 
        this.toasterService = toasterService;
        this.sanitizer=sanitizer;
    }
    
    ngOnInit(){
        this.videoSource='https://solarsitedesign.app.box.com/embed/s/sstwudpcclefxemujcn5eyvvixqewf0h';
        $('#mydiv').show();
        this.solarService.getSiteVisit(<Solar>this.model).subscribe(result => {
            this.result = result;
            console.log(this.result);
            //alert(this.result);
            this.pageLinks=Math.ceil(this.result.length/this.recordsPerPage);
            for (let i=1; i<=this.pageLinks; i++) {
                this.perPage=this.perPage+this.recordsPerPage;
                this.rowsPerPageOptions.push(this.perPage);
            }
            $('#mydiv').hide();
            //if (result!='') { 
                //this.message="Success";
            //} else {
                //alert("Not added");
            //}
        });
    }

    edit_inspection(id:any){ 
        this.router.navigate(['/users/addsitevisit'], { queryParams: { id: id } });
    }
	
	view_files(id:any){ 
        this.router.navigate(['/users/viewfiles'], { queryParams: { id: id } });
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

    /*download_file(id:any,projectName:any,fileName:any): Observable<File> {  
        this.applicationsUrl = 'http://www.solarsitedesign.com/img/box1/'+ projectName +'/StructuralFiles/' +fileName; alert(this.applicationsUrl);
        let headers = new Headers({ 'Content-Type': 'application/json', 'MyApp-Application' : 'AppName', 'Accept': 'application/png' });
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this.http.post(this.applicationsUrl, '', options)
            .map(this.extractContent)
            .catch(this.handleError);
    }*/

    /*private extractContent(res: Response) { 
        let blob: Blob = res.blob();
        window['saveAs'](blob, "1.png");
    }*/
        
    /*private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }*/
 
    saveFileNew(id:any,projectName:any,fileName:any,fileType:any,folderId:any) {    
        //window.open("https://www.solarsitedesign.com/webservicesangular/download?id="+id+"&project_name="+projectName+"&file_name="+fileName+"&file_type="+fileType, "_blank");
        $('#mydiv').show();
        this.model = {
            fileName: fileName,
            folderId: folderId
        };

        this.solarService.getDownloadFile(<Solar>this.model).subscribe(downloadResult => {
            this.downloadResult = downloadResult; 
            window.open(downloadResult, "_blank");
            $('#mydiv').hide();
            this.toasterService.pop('success', 'File Successfully Downloaded', '');
            this.router.navigate(['/users/sitevisitlisting']);
            this.popup.hide();

        });
    }




    popUp(id:any,projectName:any,fileName:any,fileType:any,folderId:any) {  
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

   
    /*saveFile(id:any,projectName:any,fileName:any) {   
        window.open("https://www.solarsitedesign.com/webservicesangular/download", "_blank");
        const headers = new Headers();
        headers.append('Accept', 'image/png');
        let options = new RequestOptions({ headers: headers , responseType: ResponseContentType.Blob});
        this.applicationsUrl = 'https://www.solarsitedesign.com/webservicesangular/download';   
        this.http.get(this.applicationsUrl, { headers: headers })
        .toPromise()
        .then(response => this.saveToFileSystem(response));
    }*/
 
    /*private saveToFileSystem(response) { 
        const contentDispositionHeader: string = response.headers.get('Content-Disposition'); 
        alert(contentDispositionHeader);
        const parts: string[] = contentDispositionHeader.split(';');
        const filename = parts[1].split('=')[1]; alert(filename);
        const blob = new Blob([response._body], { type: 'image/png' });
        saveAs(blob, filename);
    }*/


       
}
	

