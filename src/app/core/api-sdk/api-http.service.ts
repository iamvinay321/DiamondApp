import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {UserService} from "../user.service";
import {Observable} from "rxjs/internal/Observable";
import {HttpObserve} from "@angular/common/http/src/client";
import {catchError, map, timeout} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import Utils from "../utils";
import {TimeoutError} from "rxjs/internal-compatibility"
import * as _ from 'lodash';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';


@Injectable({
    providedIn: 'root'
})
export class ApiHttpService {
    public apiUrl: string;
    public requestTimeout: number;

    constructor(private http: HttpClient, private u: UserService) {
        this.requestTimeout = 60000;
    }

    public get<T>(endpoint: string, qs: any = {}): Observable<HttpResponse<T>> {
        return this.request(endpoint, 'GET', qs);
    }

    public post<T>(endpoint: string, data: any, qs: any = {}): Observable<HttpResponse<T>> {
        return this.request(endpoint, 'POST', qs, data);
    }

    public patch<T>(endpoint: string, data: any, qs: any = {}): Observable<HttpResponse<T>> {
        return this.request(endpoint, 'PATCH', qs, data);
    }

    public put<T>(endpoint: string, data: any, qs: any = {}): Observable<HttpResponse<T>> {
        return this.request(endpoint, 'PUT', qs, data);
    }

    public remove<T>(endpoint: string, qs: any = {}): Observable<HttpResponse<T>> {
        return this.request(endpoint, 'DELETE', qs);
    }

    public upsert<T>(endpoint: string, data: any, qs: any = {}): Observable<HttpResponse<T>> {
        if (data.id)
            return this.post<T>(endpoint, data, qs);
        return this.post<T>(endpoint, data, qs);
    }
    public edited<T>(endpoint: string, data: any, qs: any = {}): Observable<HttpResponse<T>> {
        if (data.id)
            return this.put(endpoint + `/${data.id}`, data, qs);
        // return this.post<T>(endpoint, data, qs);
    }

    public download(endpoint: string, method: string = 'GET', qs: any = {}, data?: any):
        EventEmitter<void | HttpErrorResponse> {
        let a = document.createElement('a');

        let event = new EventEmitter<void | HttpErrorResponse>();
        let requestOpts = {
            params:       _.omitBy(qs, _.isNil),
            body:         data,
            // headers:      this.getHeader(),
            responseType: <'arraybuffer' | 'blob' | 'json' | 'text'>'blob',
            observe:      <HttpObserve> 'response'
        };

        this.http.request(method, this.getUrl(endpoint), requestOpts)
            .pipe(
                timeout(this.requestTimeout),
                catchError(this.handleBlobError)
            )
            .subscribe(
                resp => {
                    const blob = new Blob([resp['body']], {type: 'text/csv'});

                    if (qs._downloadFileName) a.download = qs._downloadFileName;
                    a.href = window.URL.createObjectURL(blob);
                    a.click();

                    event.emit();
                },
                e => event.error(e),
                () => event.complete()
            );

        return event;
    }

    public save<T>(endpoint: string, data: any, qs: any = {}): Observable<HttpResponse<T>> {
        let e = Utils.format(endpoint, data).replace(/\/$/g, '');

        if (data['id'])
            return this.patch(e, data, qs);
        else
            return this.post(e, data, qs);
    }

    public getUrl(endpoint: string): string {
        return (this.apiUrl + endpoint);
    }

    public getHeader(): { [header: string]: string } {
        let headers = {'Content-Type': 'application/json'},
            apiKey = this.u.detail.getValue() ? this.u.detail.getValue().token : null;

        if (apiKey) headers['Authorization'] = `Token ${apiKey}`;

        return headers;
    }

    private request<T>(endpoint: string, method: string, qs: any = {},
                       data?: any): Observable<HttpResponse<T>> {

        let requestOpts = {
            params:       _.omitBy(qs, _.isNil),
            body:         data,
            headers:      this.getHeader(),
            responseType: <'arraybuffer' | 'blob' | 'json' | 'text'>'json',
            observe:      <HttpObserve> 'response'
        };

        const pageSize = qs.page_size || 10,
            page = qs.page || 1;

        return this.http.request(method, this.getUrl(endpoint), requestOpts)
            .pipe(
                timeout(this.requestTimeout),
                catchError(this.handleError),
                map(resp => {
                    // console.log(resp['body']['results'])
                    try {
                        resp['meta'] = resp['meta'];

                        if(resp['url'].indexOf('/user/list') != -1 || resp['url'].indexOf('/user/login') != -1){
                            resp['body'] = resp['body']['data']['result'];
                        }else{
                            resp['previousUrl'] = resp['body']['previous'];
                            resp['nextUrl'] = resp['body']['next'];
                            resp['body'] = resp['body']['results'];
                            
                        }
                        let cnt = this.itemDisplayCnt(page, pageSize, resp);
                        console.log(cnt)
                        resp['meta']['from'] = cnt.from;
                        resp['meta']['to'] = cnt.to;
                    } catch (e) {
                    }

                    return resp;
                }),
            );
    }

    private handleError(e: any) {
        let newErrorResp = e;

        if (e.error instanceof ErrorEvent || e.error instanceof ProgressEvent) {
            newErrorResp = new HttpErrorResponse({
                error:      {
                    error: {
                        detail: 'Problem connecting to the server.',
                        type:   'ClientError'
                    }
                },
                headers:    e.headers,
                status:     e.status,
                statusText: e.statusText,
                url:        e.url
            });
        } else if (e instanceof TimeoutError) {
            newErrorResp = new HttpErrorResponse({
                error:      {
                    error: {
                        detail: 'Operation timed out',
                        type:   'ServerError'
                    }
                },
                headers:    null,
                status:     504,
                statusText: 'Gateway Timeout',
                url:        null,
            });
        }

        return throwError(newErrorResp);
    }

    private itemDisplayCnt(page, pageSize, resp) {
        let from = ((page - 1) * pageSize) + 1,
            to = from + resp['body'].length - 1;

        return {from: from, to: to};
    }

    private handleBlobError(err) {
        if (err instanceof HttpErrorResponse
            && err.error instanceof Blob
            && err.error.type === "application/json") {
            // https://github.com/angular/angular/issues/19888
            // When request of type Blob, the error is also in Blob instead of object of json data
            return new Promise<any>((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = (e: Event) => {
                    try {
                        const errmsg = JSON.parse((<any>e.target).result);
                        reject(new HttpErrorResponse({
                            error:      errmsg,
                            headers:    err.headers,
                            status:     err.status,
                            statusText: err.statusText,
                            url:        err.url
                        }));
                    } catch (e) {
                        console.log(e);
                        // TODO: Throw some informatic error to user
                        reject(err);
                    }
                };
                reader.onerror = (e) => {
                    console.log(e);
                    // TODO: Throw some informatic error to user
                    reject(err);
                };
                reader.readAsText(err.error);
            });
        }

        return this.handleError(err);
    }
}
