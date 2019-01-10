import { environment } from './../../../environments/environment.var';
import { Http } from '@angular/http';
import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatatableOption} from "../../shared/components/datatable/datatable.interface";
import {ApiSdkService} from "../../core/api-sdk/api-sdk.service";
import {HomeService} from "../home.service";
import {Router} from "@angular/router";

import {  Response, Headers } from '@angular/http';



@Component({
    selector:    'app-employee',
    templateUrl: './employee.component.html',
    styleUrls:   ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterContentInit {
    datatableOptions: DatatableOption;
    @ViewChild('action') actionTpl;

    url = environment.apiUrl;
    profileData = []
    constructor(private api: ApiSdkService,
                private homeSrv: HomeService,
                private router: Router,
                private _http:Http,
            ) {
    }

    ngOnInit() {
        this.initDatatable();
        // this.api.user.getComments()
        // let header = new Headers();
        // // const token =  JSON.parse(localStorage.getItem('token')); 
        // // const id =  JSON.parse(localStorage.getItem('id')).result.user; 
        // console.log(token)
        // header.append("Authorization","Token "+token);
        // header.append("content-type","application/json");
        // console.log(header)
        // this._http.get(this.url+'user/detail/'+id,'{headers: header}').subscribe((data)=>{
        //     console.log(data.json().data.result)
        //     // debugger
        //     this.profileData = data.json().data.result
        //     console.log(this.profileData)
            
        // })
        
        
        this.homeSrv.updatePageTitle('Employee');
        this.homeSrv.updateBreadcrumb([
            {title: 'Home', routerLink: '/home/dashboard'},
            {title: 'Employee'}
        ]);
    }

    initDatatable() {

        this.datatableOptions = {
            defaultPageSize: 100,
            columns:         [
                {title: 'Employee', dataKey: 'first_name', width: '20%'},
                {title: 'Market Type', dataKey: 'department', width: '20%'},
                {title: 'Salary', dataKey: 'annual_salary', width: '15%'},
                {title: 'Status', dataKey: 'employee_status', width: '20%'},
                {title: 'Available Date', dataKey: 'employee_status_effective_date', width: '20%'},
            ],
            loadData:        qp => this.api.employee.list(qp)
        }
        // console.log(this.datatableOptions)
    }

    ngAfterContentInit(): void {
        this.homeSrv.setActionTemplate(this.actionTpl);
    }

    addNew(): void {
        this.router.navigate(['/home/employee/add'])
    }

}
