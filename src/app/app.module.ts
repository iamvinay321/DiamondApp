import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from "./auth/auth.module";
import {RouterModule} from "@angular/router";
import {HomeModule} from "./home/home.module";
import {CoreModule} from "./core/core.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LaddaModule} from "angular2-ladda";
import {AppRoutingModule} from "./app-routing.module";
import {NgxMaskModule} from "ngx-mask";
import {
    AccordionModule,
    AlertModule,
    BsDropdownModule,
    PaginationModule,
    TypeaheadModule
} from "ngx-bootstrap";
import {BlockUIModule} from "ng-block-ui";
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        NgxPaginationModule,
        ToastrModule.forRoot(),
        LaddaModule.forRoot({
            style:        "zoom-in",
            spinnerColor: "white",
            spinnerLines: 12
        }),
        NgxMaskModule.forRoot(),
        PaginationModule.forRoot(),
        BlockUIModule.forRoot(),
        TypeaheadModule.forRoot(),
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        BsDropdownModule.forRoot(),

        AppRoutingModule,
        CoreModule.forRoot(),
        AuthModule,
        HomeModule
    ],
    providers:    [],
    bootstrap:    [AppComponent]
})
export class AppModule {
}
