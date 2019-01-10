import {Injectable} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ApiHttpService} from "../api-http.service";
import {ChangePasswordRequest, User, UserRequest,Demo} from "./user.interface";
import { Http } from "@angular/http";

import { throwError } from 'rxjs';

import { map,catchError } from 'rxjs/operators';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: ApiHttpService, private _http: Http) {
    }

    upsert(data: UserRequest): Observable<HttpResponse<Array<User>>> {
        return this.http.upsert('user/create', data);
    }

    edited(data: UserRequest): Observable<HttpResponse<Array<User>>> {
        return this.http.edited('user/edit', data);
    }

    list(qp?: any): Observable<HttpResponse<Array<User>>> {
        return this.http.get('user/list', qp);

    }

    changePassword(userId: number | string, data: ChangePasswordRequest): Observable<HttpResponse<void>> {
        return this.http.put(`user/changepassword/${userId}`, data);
        // return this.http.put(`users/${userId}/actions/change_password`, data);
    }

    get(id: number | string): Observable<HttpResponse<User>> {
        return this.http.get(`user/detail/${id}`);
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
