import { ViewComponent } from './view/view.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import { ProjectComponent } from './project.component';


const routes: Routes = [
    {path: '', component: ProjectComponent},
    {path: 'add', component: AddComponent},
    {path: ':id/edit', component: EditComponent},
    {path: ':id/view', component: ViewComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {
}
