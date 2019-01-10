import { NgxPaginationModule } from 'ngx-pagination';
import { ViewComponent } from './view/view.component';
import { Http } from '@angular/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {ProjectComponent} from './project.component';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports:      [
        NgbModule,
        CommonModule,
        CoreModule,
        SharedModule,
        FormsModule,
        NgxPaginationModule,
        ProjectRoutingModule,
        HttpModule,
        HttpClientModule
    ],
    declarations: [ProjectComponent, AddComponent, EditComponent,ViewComponent]
})
export class ProjectModule {
}
