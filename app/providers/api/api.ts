import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Api {

  constructor(private http: Http) { }
  
  getList(url, token, dateServ) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = { token: token, dateServ: dateServ };
      let _url = `${url}/api/date-filter`;

      this.http.post(_url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }
  
  search(url, query, token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      let body = { token: token, query: query };
      
      let _url = `${url}/api/search`;
      this.http.post(_url, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }

}
