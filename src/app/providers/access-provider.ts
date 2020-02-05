import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';


@Injectable()
export class AccessProviders {
    server = 'http://localhost/mobile_application/api/';
    constructor(
        public http: HttpClient
    ) { }

    postData(body, file) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8'
        });
        let options = {
            headers: headers
        };

        return this.http.post(this.server + file, JSON.stringify(body), options)
            .timeout(59000)// 59sec timeout
            .map(res => res);
    }
}
