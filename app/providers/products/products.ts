import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Products {

  constructor(private http: Http) {}

  getList(url, token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      let _url = `${url}/products?token=${token}`;
      this.http.get(_url, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, err => {
          reject(err)
        });
    });
  }
  
}

