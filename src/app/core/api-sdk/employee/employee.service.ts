import {Injectable} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ApiHttpService} from "../api-http.service";
import { Employee} from "./employee.interface";
import { Http } from "@angular/http";

import { throwError } from 'rxjs';

import { map,catchError } from 'rxjs/operators';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: ApiHttpService, private _http: Http) {
    }

    upsert(data: Employee): Observable<HttpResponse<Array<Employee>>> {
        return this.http.upsert('employee/create', data);
    }

    edited(data: Employee): Observable<HttpResponse<Array<Employee>>> {
        return this.http.edited('employee/edit', data);
    }

    list(qp?: any): Observable<HttpResponse<Array<Employee>>> {
        return this.http.get('employee/list', qp);

    }

    changePassword(userId: number | string, data: Employee): Observable<HttpResponse<void>> {
        return this.http.put(`employee/${userId}/actions/change_password`, data);
    }

    get(id: number | string): Observable<HttpResponse<Employee>> {
        return this.http.get(`employee/detail/${id}`);
    }
    // x(qp?: any): Observable<HttpResponse<Array<User>>> {
    //     this._http.get('http://localhost:8000/user/detail/2').subscribe((data)=>{
    //         console.log(data.json().data.result)
    //         // debugger
    //         return data.json().data.result;
    //     })
    // }
    // getComments()  : Observable<Demo[]>  {

    //     // ...using get request
    //     return this._http.get('https://jsonplaceholder.typicode.com/posts')
    //                    // ...and calling .json() on the response to return data
    //                     .map((res) => console.log(res.json()) 
    //                     //...errors if any
    //                     .catchError((error :any) => Observable.throw(error.json().error || 'Server error'));

    // }
}
