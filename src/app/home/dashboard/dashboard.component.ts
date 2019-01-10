import {Component, OnInit} from '@angular/core';
import {HomeService} from "../home.service";


@Component({
    selector:    'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls:   ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private homeSrv: HomeService) {
    }

    ngOnInit() {
        this.homeSrv.updatePageTitle('Dashboard');
        this.homeSrv.updateBreadcrumb([{title: 'Home'}]);
    }

}
