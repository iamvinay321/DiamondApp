import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from "./login-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";


@NgModule({
    imports:      [
        CommonModule,
        SharedModule,
        CoreModule,

        LoginRoutingModule,
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
