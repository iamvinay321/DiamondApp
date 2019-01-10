import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {map, shareReplay} from "rxjs/operators";
import {ApiHttpService} from "../api-http.service";


@Injectable({
    providedIn: 'root'
})
export class SystemService {
    constructor(private http: ApiHttpService) {
    }

    private _constants: Observable<Object>;

    get constants(): Observable<any> {
        return this._constantBody;
    }

    private _enums: Observable<Object>;

    get enums(): Observable<any> {
        return this._enumsBody;
    }

    private get _constantBody(): Observable<any> {
        if (!this._constants) {
            this._constants = this.http.get<Object>('/system/constants')
                .pipe(
                    map(resp => resp.body),
                    shareReplay(1)
                );
        }

        return this._constants;
    }

    private get _enumsBody(): Observable<any> {
        if (!this._enums) {
            this._enums = this.http.get<Object>('/system/enums')
                .pipe(
                    map(resp => resp.body),
                    shareReplay(1)
                );
        }

        return this._enums;
    }
}
