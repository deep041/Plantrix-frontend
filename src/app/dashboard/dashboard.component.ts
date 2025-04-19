import { Component } from '@angular/core';
import { HeaderComponent } from "../common/components/header/header.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [HeaderComponent, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

}
