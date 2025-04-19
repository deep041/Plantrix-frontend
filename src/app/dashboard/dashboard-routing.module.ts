import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', component: ProjectsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
