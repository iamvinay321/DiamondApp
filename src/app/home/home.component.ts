import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HomeService} from "./home.service";


@Component({
    selector:    'app-home',
    templateUrl: './home.component.html',
    styleUrls:   ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('actionContainer', {read: ViewContainerRef}) _vcr;

    readonly menuItems = [
        {
            title:      'Dashboard',
            icon:       'la-home',
            routerLink: '/home/dashboard'
        },
        {title: 'System', isHeader: true},
        {
            title:      'Users',
            icon:       'la-user',
            routerLink: '/home/user'
        },
        {
            title:      'Employee',
            icon:       'la-group',
            routerLink: '/home/employee'
        },
        {
            title:      'Project',
            icon:       'la-file',
            routerLink: '/home/project'
        },
        {
            title:   'Settings',
            icon:    'la-cog',
            subMenu: [
                {title: 'Quote Statuses', routerLink: '/home/setting/quote-status'}
            ]
        }
    ];

    constructor(public srv: HomeService) {
    }

    ngOnInit() {
        this.initBodyClass();
        this.srv.actionContainer = this._vcr;
    }

    private initBodyClass() {
        document.body.className = 'vertical-layout vertical-menu-modern 2-columns menu-expanded fixed-navbar';
        document.body.setAttribute('data-open', "click");
        document.body.setAttribute('data-menu', "vertical-menu-modern");
        document.body.setAttribute('data-col', "2-columns");
    }
}
