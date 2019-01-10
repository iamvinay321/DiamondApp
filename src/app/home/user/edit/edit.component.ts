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
        this.homeSrv.updatePageTitle('Edit User');

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
        console.log(data)
        this.api.user.edited(data)
            .subscribe(
                resp => {
                    this.l.debug('User updated', resp.body);
                    this.t.success('User info updated successfully');
                    this.ui.laddaUser = false;
                },
                e => {
                    this.ui.laddaUser = false;
                    this.l.error('User update error', e);
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

        this.api.user.get(this.id)
            .subscribe(
                resp => {
                    this.blockUI.stop();
                    this.userForm.patchValue(resp.body);
                    console.log(resp.body)
                    this.homeSrv.updateBreadcrumb([
                        {title: 'Home', routerLink: '/home/dashboard'},
                        {title: 'Users', routerLink: '/home/user'},
                        {title: `${resp.body.email}(#${resp.body.id})`}
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
            last_name:  ['', Validators.required],
            email:  ['', Validators.required],
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
