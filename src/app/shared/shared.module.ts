import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IcheckDirective} from "./directives/icheck.directive";
import {FormErrorMsgComponent} from "./components/form-error-msg/form-error-msg.component";
import {NoDataMsgComponent} from "./components/no-data-msg/no-data-msg.component";
import {PageSizeSelectorComponent} from './components/page-size-selector/page-size-selector.component';
import {DatatableComponent} from './components/datatable/datatable.component';
import {CoreModule} from "../core/core.module";
import {RouterModule} from "@angular/router";
import { DatatableprojectComponent } from './components/datatableproject/datatableproject.component';


@NgModule({
    imports:      [
        CommonModule,
        CoreModule,
        RouterModule
    ],
    declarations: [
        IcheckDirective,
        FormErrorMsgComponent,
        NoDataMsgComponent,
        PageSizeSelectorComponent,
        DatatableComponent,
        DatatableprojectComponent
    ],
    exports:      [
        IcheckDirective,
        FormErrorMsgComponent,
        NoDataMsgComponent,
        PageSizeSelectorComponent,
        DatatableComponent,
        DatatableprojectComponent
    ]
})
export class SharedModule {
}
