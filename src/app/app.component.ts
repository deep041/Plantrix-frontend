import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './common/services/api.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

    title = 'Plantrix';

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.testAPI().subscribe((data: any) => {
            console.log(data);
        });
    }
}
