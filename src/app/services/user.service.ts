import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  
  constructor(private http: Http) {
  }

  create(user: User) {
  	let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, method: "post"});

 	return this.http.post('http://192.155.246.146:8145/users/registration_angular', user).map(res => <any> JSON.parse(res["_body"]));
  }

  
}
