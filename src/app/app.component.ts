import { environment } from './../environments/environment.var';
import {Component, OnInit} from '@angular/core';
import {ApiSdkService} from "./core/api-sdk/api-sdk.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";


@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Diamond';

    constructor(private api: ApiSdkService, private router: Router) {
    }

    ngOnInit(): void {
        this.api.http.apiUrl = environment.apiUrl;

        this.initHomeRedirect();
    }

    /**
     * Redirect to /home/dashboard view if user tries to navigate to /home url
     */
    private initHomeRedirect() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(
                (event: NavigationEnd) => {
                    if (event.url == '/home')
                        this.router.navigate(['/home/dashboard']);
                }
            )
    }
}
