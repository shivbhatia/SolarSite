import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ServerDataSource } from 'ng2-smart-table';
import { Solar } from '../models/solar.model';
import {AppSettings} from '../appSettings';

@Injectable()
export class SolarService {
    static DATA_SIZE = 500;
    source:any;
    result:any;
    model: any = {};

    constructor(private http: Http) {
    }

    getSolarProjects(solar: Solar) { 
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') });
        const options = new RequestOptions({ headers: headers })
        return this.http.get(AppSettings.API_ENDPOINT+'solarDashboard',options).map(res => <any> JSON.parse(res["_body"]));
    }

    trackProject(project_id,checked) { 
        const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': localStorage.getItem('token'), 'ProjectId': project_id,'Checked': checked });
        const options = new RequestOptions({ headers: headers, method: "post"});
        return this.http.get(AppSettings.API_ENDPOINT+'trackProjects', options).map(res => <any> JSON.parse(res["_body"]));
    }



   getMydashboardData(solar: Solar) { 
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') });
    const options = new RequestOptions({ headers: headers })

    //return this.http.get('http://192.155.246.146:8145/users/solarDashboard_angular', solar,options ).map(res => <any> res);
  return this.http.get('http://192.155.246.146:8145/marketplaces/myDashboard_angular',options).map(res => <any> JSON.parse(res["_body"]));

  }

  getList(solar: Solar){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

 	  return this.http.get('http://192.155.246.146:8145/users/solarDashboardList_shiv', solar).map(res => JSON.parse(res['_body'])).toPromise();
  }

  getData(): Promise<any> {
    return this.getList(<Solar>this.model).then(data => {
      return data;
    });
  }
  
  addsitevisit(formData) {
    let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers, method: "post" });
    //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //let options = new RequestOptions({ headers: headers, method: "post"});
    //console.log(solar);
    return this.http.post('http://192.155.246.146:8145/users/add_inspection_angular', formData).map(res => <any> res["_body"]);
  }
  
  getSiteVisit(solar: Solar) { //alert("test");
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') });
    const options = new RequestOptions({ headers: headers })

    //return this.http.get('http://192.155.246.146:8145/users/solarDashboard_angular', solar,options ).map(res => <any> res);
    return this.http.get('http://192.155.246.146:8145/users/inspection_angular',options).map(res => <any> JSON.parse(res['_body']));

  }

   editSiteVisit(SiteId: Solar) { //alert(SiteId);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token'), 'SiteId': SiteId });
    const options = new RequestOptions({ headers: headers })

    //return this.http.get('http://192.155.246.146:8145/users/solarDashboard_angular', solar,options ).map(res => <any> res);
    return this.http.get('http://192.155.246.146:8145/users/edit_inspection_angular',options).map(res => <any> JSON.parse(res['_body']));

  }

  deleteInspection(SiteId: Solar) { //alert(SiteId);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token'), 'SiteId': SiteId });
    const options = new RequestOptions({ headers: headers })

    //return this.http.get('http://192.155.246.146:8145/users/solarDashboard_angular', solar,options ).map(res => <any> res);
    return this.http.get('http://192.155.246.146:8145/users/delete_inspection_angular',options).map(res => <any> JSON.parse(res['_body']));

  }
  getInspectionReport(solar: Solar) { //alert("test");
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') });
    const options = new RequestOptions({ headers: headers })

    //return this.http.get('http://192.155.246.146:8145/users/solarDashboard_angular', solar,options ).map(res => <any> res);
    return this.http.get('http://192.155.246.146:8145/users/inspection_report_angular',options).map(res => <any> JSON.parse(res['_body']));
  }

    




}
