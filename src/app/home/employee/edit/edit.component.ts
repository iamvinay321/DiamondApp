import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../home.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiSdkService} from "../../../core/api-sdk/api-sdk.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoggerService} from "../../../core/logger.service";
import {ExValidators} from "../../../core/validators";
import {BlockUI, NgBlockUI} from "ng-block-ui";


@Component({
    selector:    'app-edit',
    templateUrl: './edit.component.html',
    styleUrls:   ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    userForm: FormGroup;
    pwdForm: FormGroup;
    id: string;
    ui: any;
    @BlockUI('ui') blockUI: NgBlockUI;

    constructor(private homeSrv: HomeService,
                private fb: FormBuilder,
                private api: ApiSdkService,
                private router: ActivatedRoute,
                private t: ToastrService,
                private l: LoggerService) {
    }

    ngOnInit() {
        this.homeSrv.updatePageTitle('Edit Employee');

        this.initForm();
        this.id = this.router.snapshot.paramMap.get('id');
        console.log(this.id)
        this.loadData();
        this.ui = {laddaUser: false, laddaPassword: false, hasError: false}
    }

    updateUser() {
        if (this.userForm.invalid) return;

        this.ui.laddaUser = true;
        const data = this.userForm.value;
        data['id'] = this.id;

        this.api.employee.edited(data)
            .subscribe(
                resp => {
                    this.l.debug('Employee updated', resp.body);
                    this.t.success('Employee info updated successfully');
                    this.ui.laddaUser = false;
                },
                e => {
                    this.ui.laddaUser = false;
                    this.l.error('Employee update error', e);
                    this.t.error(e.error.error.detail);
                }
            )
    }

    updatePassword() {
        const data = this.pwdForm.value;

        if (this.pwdForm.invalid) return;

        this.ui.laddaPassword = true;

        this.api.employee.changePassword(this.id, data)
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

        this.api.employee.get(this.id)
            .subscribe(
                resp => {
                    this.blockUI.stop();
                    this.userForm.patchValue(resp.body);
                    this.homeSrv.updateBreadcrumb([
                        {title: 'Home', routerLink: '/home/dashboard'},
                        {title: 'Employee', routerLink: '/home/employee'},
                        {title: `${resp.body.first_name}(#${resp.body.id})`}
                    ]);
                },
                e => {
                    this.ui.hasError = true;
                    this.l.error('Failed to load user', e);
                    this.blockUI.stop();
                    this.t.error(e.error.error.detail);
                }
            )
    }

    private initForm() {
        this.userForm = this.fb.group({
            first_name: ['', Validators.required],
            middle_name:  [''],
            last_name:  ['', Validators.required],
            prior_last_name :[''],
            suffix :         [''],
            gender :         [''],
            birth_date :     [''],
            employee_status_effective_date :  [''],
            employee_status :[''],
             
     
             address_1 :  [''],
             address_2 :  [''],
             city :       [''],
             state :      [''],
             zip_code :   [''],
             country :    [''],
             disability : [''],
             ethnicity :  [''],
             smoker :     [''],
             veteran :    [''],
 
             hire_date :         [''],
             rehire_date :       [''],
             termination_date :  [''],
             user_account_deactivation_date :  [''],
             annual_salary :     [''],
             cost_code :         [''],
             department :        [''],
             division :          [''],
             eeo_class :         [''],
             employment_type :   [''],
             is_supervisor_reviewer :  [''],
             job_title :         [''],
             position :          [''],
            
            is_active:  true
        });

        this.pwdForm = this.fb.group({
                new_password:     ['', Validators.required],
                confirm_password: ['', Validators.required]
            }, {
                validator: [
                    ExValidators.fieldMatchValidator(['new_password', 'confirm_password'], true),
                ]
            }
        );
    }

}
