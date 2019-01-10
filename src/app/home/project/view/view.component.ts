import { Http } from '@angular/http';
import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../home.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiSdkService} from "../../../core/api-sdk/api-sdk.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoggerService} from "../../../core/logger.service";
import {ExValidators} from "../../../core/validators";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector:    'app-view',
    templateUrl: './view.component.html',
    styleUrls:   ['./view.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class ViewComponent implements OnInit {
    projectAssinForm: FormGroup;
    pwdForm: FormGroup;
    id: string;
    ui: any;
    data: any;
    countries = ['USA', 'Canada', 'Uk']  
    employees = ['aa', 'hh', 'bb']  
     marked = false;
    markedRole = false;
    assignment = []
    nex:any;
  theCheckbox = false;
  theCheckboxrole = false;
    @BlockUI('ui') blockUI: NgBlockUI;

    constructor(private homeSrv: HomeService,
                private fb: FormBuilder,
                private api: ApiSdkService,
                private router: ActivatedRoute,
                private t: ToastrService,
                private l: LoggerService,
                private http: Http,
            
                config: NgbModalConfig, private modalService: NgbModal) {
                    config.backdrop = 'static';
                    config.keyboard = false;
    }
    open(content) {
        this.modalService.open(content);
      }
    toggleVisibility(e){
        this.marked= e.target.checked;
      }
      toggleVisibilityRole(e){
        this.markedRole = e.target.checked;
      }

    ngOnInit() {
        this.homeSrv.updatePageTitle('Assigment Project');

        this.initForm();
        this.id = this.router.snapshot.paramMap.get('id');
        console.log('+++++++++++'+this.id)
        this.loadData();
        this.ui = {laddaUser: false, laddaPassword: false, hasError: false}


        this.http.get('http://18.224.238.152:8000/project-assignment/postions').subscribe((res)=>{
            this.countries = res.json().data.result
        })


            this.http.get('http://18.224.238.152:8000/employee/list').subscribe((res)=>{
             console.log(res.json()['results']) 
             this.employees = res.json()['results']
    })
    // project-assignment/list/
    this.http.get('http://18.224.238.152:8000/project-assignment/list/'+this.router.snapshot.paramMap.get('id')).subscribe((res)=>{
        console.log(res.json().data.result) 
        this.assignment = res.json().data.result;
})
        
    }

    updateProject() {
        if (this.projectAssinForm.invalid) return;
        this.ui.laddaUser = true;
        const data = this.projectAssinForm.value;

        console.log(this.projectAssinForm.value)
        const route_id = this.router.snapshot.paramMap.get('id');
        data['project_id'] = route_id;
        console.log('object----------------------------' ,this.id)

        this.api.project.assigned(data)
            .subscribe(
                resp => {
                    console.log(resp)
                    this.l.debug('Project Assignment', resp.body);
                    this.t.success('Project Assignment created successfully');
                    this.ui.laddaUser = false;
                },
                e => {
                    this.ui.laddaUser = false;
                    this.l.error('Project update error', e);
                    this.t.error(e.error.error.detail);
                }
            )
    }

    updatePassword() {
        const data = this.pwdForm.value;

        if (this.pwdForm.invalid) return;

        this.ui.laddaPassword = true;

        this.api.user.changePassword(this.id, data)
            .subscribe(
                () => {
                    this.ui.laddaPassword = false;
                    this.t.success('Password changed successfully');
                },
                e => {
                    this.ui.laddaPassword = false;
                    this.l.debug('Password change error', e);
                    this.t.error(e.error.error.detail);
                }
            )
    }

    private loadData() {
        this.blockUI.start();
        // console.log(this.id)
        this.api.project.get(this.id)
            .subscribe(
                resp => {
                    this.blockUI.stop();
                    console.log(resp.body)
                    this.data = resp.body
                    this.projectAssinForm.patchValue(resp.body);
                    // console.log(this.projectForm)
                    this.homeSrv.updateBreadcrumb([
                        {title: 'Home', routerLink: '/home/dashboard'},
                        {title: 'Project', routerLink: '/home/project'},
                        {title: `${resp.body.project}(#${resp.body.id})`}
                    ]);
                },
                e => {
                    this.ui.hasError = true;
                    this.l.error('Failed to load project', e);
                    this.blockUI.stop();
                    this.t.error(e.error.error.detail);
                }
            )
    }

    private initForm() {
        this.projectAssinForm = this.fb.group({
            position:       ['' ,Validators.required],
            // start_date:        [''],
            // end_date:         [''],
            employee_id: [''],
            countryControl: ['Canada']  ,
            employeeControl: ['hh']  
             });

    
    }
    
}
