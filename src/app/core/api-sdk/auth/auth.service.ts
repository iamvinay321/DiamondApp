import {Injectable} from '@angular/core';
import {LoginRequest, User} from "./user.interface";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {ApiHttpService} from "../api-http.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: ApiHttpService) {
    }

    login(data: LoginRequest): Observable<HttpResponse<User>> {
        return this.http.post<User>('user/login', data);
    }
}
