import { environment } from './../../../environments/environment.var';
import { Http } from '@angular/http';
import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {DatatableprojectOption} from "../../shared/components/datatableproject/datatableproject.interface";
import {ApiSdkService} from "../../core/api-sdk/api-sdk.service";
import {HomeService} from "../home.service";
import {Router} from "@angular/router";

import {  Response, Headers } from '@angular/http';



@Component({
    selector:    'app-project',
    templateUrl: './project.component.html',
    styleUrls:   ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterContentInit {
    datatableprojectOptions: DatatableprojectOption;
    @ViewChild('action') actionTpl;

    url = environment.apiUrl;
    profileData = []

    collection = [];
    constructor(private api: ApiSdkService,
                private homeSrv: HomeService,
                private router: Router,
                private _http:Http,
            ) {
                for (let i = 1; i <= 100; i++) {
                    this.collection.push(`item ${i}`);
                  }
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
        
        
        this.homeSrv.updatePageTitle('Project');
        this.homeSrv.updateBreadcrumb([
            {title: 'Home', routerLink: '/home/dashboard'},
            {title: 'Project'}
        ]);
    }

    initDatatable() {

        this.datatableprojectOptions = {
            defaultPageSize: 10,
            columns:         [
                {title: 'Project', dataKey: 'project', width: '5%'},
                {title: 'JobID', dataKey: 'job_id', width: '10%'},

                {title: 'System Of Origin', dataKey: 'system_of_origin', width: '20%'},
                {title: 'Project Status', dataKey: 'project_status', width: '20%'},
                {title: 'Database Stamp', dataKey: 'database_stamp', width: '20%'},

                
                // {title: 'Salary', dataKey: 'first_name', width: '15%'},
                // {title: 'Success Rate', dataKey: 'last_name', width: '20%'},
                // {title: 'Available Date', dataKey: 'first_name', width: '25%'},
            ],
            loadData:        qp => this.api.project.list(qp)
        }
        // console.log(this.datatableOptions)
    }

    ngAfterContentInit(): void {
        this.homeSrv.setActionTemplate(this.actionTpl);
    }

    addNew(): void {
        this.router.navigate(['/home/project/add'])
    }

}
