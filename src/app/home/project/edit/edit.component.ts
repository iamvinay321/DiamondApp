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
    projectForm: FormGroup;
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
        this.homeSrv.updatePageTitle('Edit Project');

        this.initForm();
        this.id = this.router.snapshot.paramMap.get('id');
        console.log('+++++++++++'+this.id)
        this.loadData();
        this.ui = {laddaUser: false, laddaPassword: false, hasError: false}
    }

    updateProject() {
        if (this.projectForm.invalid) return;
        this.ui.laddaUser = true;
        const data = this.projectForm.value;
        data['id'] = this.id;
        console.log('object----------------------------')

        this.api.project.edited(data)
            .subscribe(
                resp => {
                    console.log(resp)
                    debugger
                    this.l.debug('Project updated', resp.body);
                    this.t.success('Project info updated successfully');
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
                    this.projectForm.patchValue(resp.body);
                    console.log(this.projectForm)
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
        this.projectForm = this.fb.group({
            project:       ['', Validators.required],
                system_of_origin:        ['', Validators.required],
                project_status:         ['', [Validators.required]],
                database_stamp: ['', [Validators.required]],
                project_number: [],
                project_description: [],
                project_managers: [],
                project_stage: [],
                projected_gp: [],
                procore_index: [],
                address: [],
                city: [],
                state: [],
                zip: [],
                latitude: [],
                longitude: [],
                phone: [],
                created: [],
                last_updated: [],
                procore_status: [],
                sage_status: [],
                customer_id: [],
                customer_name: [],
                architect: [],
                division: [],
                contract_type: [],
                team_leader: [],
                superintendents : [],
                original_contract_value : [],
                approved_contract_changes :  [,Validators.nullValidator],
                revised_contract_value : [],
                jtd_work_billed : [],
                jtd_retainage_held : [],
                jtd_payments_received : [],
                original_estimated_cost : [],
                approved_estimate_changes : [],
                revised_estimated_cost : [],
                original_committed_cost : [],
                approved_commitment_changes : [,Validators.nullValidator],
                revised_committed_cost : [],
                jtd_cost : [],
                jtd_payments_made : [],
                projected_post : [],
                original_gp : [],
                original_gp_percent : [],
                projected_gp_percent : [],
                gain_fade : [],
                gain_fade_percent : [],



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
