import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import { EmployeeComponent } from './employee.component';


const routes: Routes = [
    {path: '', component: EmployeeComponent},
    {path: 'add', component: AddComponent},
    {path: ':id/edit', component: EditComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
