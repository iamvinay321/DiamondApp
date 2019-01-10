import {Component, OnInit} from '@angular/core';
import {ApiSdkService} from "../../../core/api-sdk/api-sdk.service";
import {HomeService} from "../../home.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExValidators} from "../../../core/validators";
import {ToastrService} from "ngx-toastr";
import {LoggerService} from "../../../core/logger.service";


@Component({
    selector:    'app-add',
    templateUrl: './add.component.html',
    styleUrls:   ['./add.component.scss']
})
export class AddComponent implements OnInit {
    form: FormGroup;
    ui: any;

    constructor(private api: ApiSdkService,
                private homeSrv: HomeService,
                private fb: FormBuilder,
                private t: ToastrService,
                private l: LoggerService) {
    }

    ngOnInit() {
        this.homeSrv.updatePageTitle('New Employee');
        this.homeSrv.updateBreadcrumb([
            {title: 'Home', routerLink: '/home/dashboard'},
            {title: 'Employee', routerLink: '/home/employee'},
            {title: 'New Employee'}
        ]);
        this.ui = {laddaSave: false};
        this.initForm();
    }

    save() {
        if (this.form.invalid) return;

        this.ui.laddaSave = true;
        this.api.employee.upsert(this.form.value)
            .subscribe(
                resp => {
                    this.t.success('User created successfully');
                    this.ui.laddaSave = false;
                    this.initForm();
                },
                e => {
                    this.ui.laddaSave = false;
                    this.l.error('User error', e);
                    this.t.error(e.error.error.detail);
                }
            )
    }

    private initForm() {
        this.form = this.fb.group(
            {
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
             annual_salary :     ['', Validators.required],
             cost_code :         ['', Validators.required],
             department :        [''],
             division :          [''],
             eeo_class :         ['', Validators.required],
             employment_type :   [''],
             is_supervisor_reviewer :  [''],
             job_title :         [''],
             position :          [''],
            },
            {
                validator: [
                    ExValidators.fieldMatchValidator(['password', 'confirm_password'], true),
                ]
            }
        );
    }
}
