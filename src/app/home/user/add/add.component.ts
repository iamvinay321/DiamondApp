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
        this.homeSrv.updatePageTitle('New User');
        this.homeSrv.updateBreadcrumb([
            {title: 'Home', routerLink: '/home/dashboard'},
            {title: 'Users', routerLink: '/home/user'},
            {title: 'New User'}
        ]);
        this.ui = {laddaSave: false};
        this.initForm();
    }

    save() {
        if (this.form.invalid) return;

        this.ui.laddaSave = true;
        this.api.user.upsert(this.form.value)
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
                first_name:       ['', Validators.required],
                last_name:        ['', Validators.required],
                email:            ['', [Validators.required, Validators.email, Validators.min(8)]],
                password:         ['', [Validators.required]],
                confirm_password: ['', [Validators.required]],
            },
            {
                validator: [
                    ExValidators.fieldMatchValidator(['password', 'confirm_password'], true),
                ]
            }
        );
    }
}
