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
    projectForm: FormGroup;
    ui: any;

    constructor(private api: ApiSdkService,
                private homeSrv: HomeService,
                private fb: FormBuilder,
                private t: ToastrService,
                private l: LoggerService) {
    }

    ngOnInit() {
        this.homeSrv.updatePageTitle('New Project');
        this.homeSrv.updateBreadcrumb([
            {title: 'Home', routerLink: '/home/dashboard'},
            {title: 'Project', routerLink: '/home/project'},
            {title: 'New project'}
        ]);
        this.ui = {laddaSave: false};
        this.initForm();
    }

    save() {
        console.log('hhhh')
        if (this.projectForm.invalid) return;
console.log(this.projectForm.value)
            this.ui.laddaSave = true;
            this.api.project.upsert(this.projectForm.value)
                .subscribe(
                    resp => {
                        this.t.success('Project created successfully');
                        this.ui.laddaSave = false;
                        this.initForm();
                    },
                    e => {
                        this.ui.laddaSave = false;
                        this.l.error('Project error', e);
                        this.t.error(e.error.error.detail);
                    }
                )
    }

    private initForm() {
        this.projectForm = this.fb.group(
            {
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



            },
            {
                validator: [
                    ExValidators.fieldMatchValidator(['password', 'confirm_password'], true),
                ]
            }
        );
    }
}
