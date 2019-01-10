import { HomeComponent } from './home/home.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
    {
        path:       '',
        pathMatch:  'full',
        redirectTo: '/home/dashboard'
    },
    // {
    //     path:       '',
    //     loadChildren: '../app/home/home.module#HomeModule'
    //     // redirectTo: '/home/dashboard'
    // },

];


@NgModule({
    imports:      [
        RouterModule.forRoot(routes)
    ],
    exports:      [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
