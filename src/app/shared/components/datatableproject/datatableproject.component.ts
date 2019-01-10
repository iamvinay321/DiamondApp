import { FormBuilder } from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {Column, DatatableprojectOption} from "./datatableproject.interface";
import {Observable, ReplaySubject} from "rxjs";
import {LoggerService} from "../../../core/logger.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import * as _ from 'lodash';
import {ApiListItem} from "../../../core/api-sdk/api-sdk.interface";


@Component({
    selector:    'app-datatableproject',
    templateUrl: './datatableproject.component.html',
    styleUrls:   ['./datatableproject.component.scss']
})
export class DatatableprojectComponent implements OnInit {
    @Input() options: DatatableprojectOption;
    data: ReplaySubject<ApiListItem<any>>;
    ui: any;
    page: number;
    searchQuery: string;
    pageSize: number;

    previous:number;
    next:number;

    to = 20
    form = 1
    readonly defaultActions = {
        edit: true,
        view: true
    }

    constructor(private l: LoggerService,
                private t: ToastrService,
                private router: Router) {
    }

    loadData(page: number = 1) {
        const qp = {
            page_size: this.options.defaultPageSize,
            page:      page,
            search:    this.searchQuery
        };

        this.ui.isLoading = true;

        this.options.loadData(qp)
            .subscribe(
                resp => {
                    console.log(resp)
                    console.log(resp['previousUrl'])
                    
                    if(resp['previousUrl'] != null ){
                        this.previous = resp['previousUrl'].split('?')[1]
                    }
                    
                    this.next  = resp['nextUrl'].split('?')[1]
                    // if(resp['previousUrl'] != null ){
                    // this.previous =  resp['previousUrl'].split('?')[1].split('=')[1].split('&')[0]
                    // }
                    
                    // this.next     =  resp['nextUrl'].split('?')[1].split('=')[1].split('&')[0]
                    this.data.next({items: resp.body, meta: resp['meta']});
                    this.ui.isLoading = false;
                },
                e => {
                    this.l.debug('list error', e);
                    this.t.error(e.error.error.detail);
                    this.ui.isLoading = false;
                }
            )
    }

    getColumnValue(column: Column, item) {
        if (column.dataKey instanceof Function) {
            return column.dataKey(item)
        } else {
            return item[column.dataKey]
        }
    }

    getColumnType(column: Column, item) {
        if (this.getColumnValue(column, item) instanceof Observable) {
            return 'async';
        } else {
            return 'sync';
        }
    }

    ngOnInit() {
        this.data = new ReplaySubject(1);
        this.ui = {isLoading: false};
        this.pageSize = this.options.defaultPageSize;
        this.loadData();
        this.options = _.merge({actions: this.defaultActions}, this.options)
    }

}
