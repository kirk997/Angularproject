import { Injectable } from "@angular/core";
import { Http, Response,Headers, RequestOptions } from "@angular/http";
import { Employee } from "../models/employee.model";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { observeOn } from "rxjs/operator/observeOn";



@Injectable()
export class FormPoster {
    private extractData(res:Response){
        let body=res.json();
        return body.fields || {};
    }
    private extractLanguages(res:Response){
        let body=res.json();
        return body.data || {};
    }

    private handleError(error:any){
        console.error('post error: ',error);
        return Observable.throw(error.statusText);
    }

    constructor(private http: Http) {

    }


    getLanguages():Observable<any>{
        return this.http.get('http://localhost:3100/getlanguages')
        .delay(5000)
        .map(this.extractLanguages)
        .catch(this.handleError);
    }

    postEmployeeForm(employee:Employee):Observable<any>{
        let body =JSON.stringify(employee);
        let headers=new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});

        console.log('posting employee: ', employee);
        return this.http.post('http://localhost:3100/postemployee',body,options)
        .map(this.extractData)
        .catch(this.handleError);
    }

}