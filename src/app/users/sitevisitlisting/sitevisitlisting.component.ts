import { Component,ViewEncapsulation,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers,RequestOptions,ResponseContentType} from '@angular/http';
import {DataTableModule,SharedModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { SolarService } from '../../services/solar.service';
import { Solar } from '../../models/solar.model';
import { saveAs } from 'file-saver/FileSaver';

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

    
    constructor(private router: Router,private solarService: SolarService, toasterService: ToasterService, private confirmationService: ConfirmationService, private http: Http) { 
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

    download_file(id:any,projectName:any,fileName:any): Observable<File> {  alert(id);
        this.applicationsUrl = 'http://www.solarsitedesign.com/img/box1/'+ projectName +'/StructuralFiles/' +fileName; alert(this.applicationsUrl);
        let headers = new Headers({ 'Content-Type': 'application/json', 'MyApp-Application' : 'AppName', 'Accept': 'application/png' });
        let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
        return this.http.post(this.applicationsUrl, '', options)
            .map(this.extractContent)
            .catch(this.handleError);
        }

        private extractContent(res: Response) { alert("test");
            let blob: Blob = res.blob();
            window['saveAs'](blob, "1.png");
        }
        private handleError(error: any): Promise<any> { alert("new");
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }

saveFile(id:any,projectName:any,fileName:any) { 
    const headers = new Headers();
    headers.append('Accept', 'image/png');
   // headers.append('Accept', 'Content-Length');
    let options = new RequestOptions({ headers: headers });

    this.applicationsUrl = 'https://www.solarsitedesign.com/webservicesangular/download';
    this.http.get(this.applicationsUrl, { headers: headers })
      .toPromise()
      .then(response => this.saveToFileSystem(response));
  }
 
  private saveToFileSystem(response) { console.log(response._body);
    const contentDispositionHeader: string = response.headers.get('Content-Disposition'); 
    alert(contentDispositionHeader);
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1]; alert(filename);
    const blob = new Blob([response._body], { type: 'image/png' });
    saveAs(blob, filename);
  }


       // alert(projectName);
        //window.open("https://www.solarsitedesign.com/file.pdf", "_blank")
    

}
	

