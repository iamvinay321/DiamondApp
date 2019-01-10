import { HttpModule } from '@angular/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import {ScrollbarModule} from "ngx-scrollbar";
import {FooterComponent} from './components/footer/footer.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {HeaderComponent} from './components/header/header.component';
import {BsDropdownModule} from "ngx-bootstrap";
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {HomeService} from "./home.service";


@NgModule({
    imports:      [
        CommonModule,
        CoreModule,
        SharedModule,

        ScrollbarModule,
        BsDropdownModule.forRoot(),
        HomeRoutingModule,
        HttpModule
    ],
    declarations: [HomeComponent, FooterComponent, MainMenuComponent, HeaderComponent],
    providers:    [HomeService]
})
export class HomeModule {
}
