import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggerService} from "./logger.service";
import {UserService} from "./user.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {LaddaModule} from "angular2-ladda";
import {ConstantLabelPipe} from "./pipes/constant-label.pipe";
import {GetPipe} from "./pipes/get.pipe";
import {ObjectToArrayPipe} from "./pipes/object-to-array.pipe";
import {NgxMaskModule} from "ngx-mask";
import {
    AccordionModule,
    AlertModule,
    BsDropdownModule,
    PaginationModule,
    TypeaheadModule
} from "ngx-bootstrap";
import {BlockUIModule} from "ng-block-ui";
import {EnumLabelPipe} from "./pipes/enum-label.pipe";
import {API_SDK} from "./api-sdk";


@NgModule({
    imports:      [
        CommonModule,
        HttpClientModule
    ],
    exports:      [
        ReactiveFormsModule,
        FormsModule,
        ToastrModule,
        LaddaModule,
        NgxMaskModule,
        PaginationModule,
        BlockUIModule,
        TypeaheadModule,
        AccordionModule,
        AlertModule,
        BsDropdownModule,

        ConstantLabelPipe,
        GetPipe,
        ObjectToArrayPipe
    ],
    declarations: [ConstantLabelPipe, EnumLabelPipe, GetPipe, ObjectToArrayPipe]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule:  CoreModule,
            providers: [LoggerService, API_SDK, UserService]
        }
    }
}
