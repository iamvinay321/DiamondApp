import { Http } from '@angular/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { HttpModule } from '@angular/http';

@NgModule({
    imports:      [
        CommonModule,
        CoreModule,
        SharedModule,
        FormsModule,

        UserRoutingModule,
        HttpModule,
        HttpClientModule
    ],
    declarations: [UserComponent, AddComponent, EditComponent]
})
export class UserModule {
}
