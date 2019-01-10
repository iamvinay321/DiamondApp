import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';


declare var $: any;

@Component({
    selector:    'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls:   ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnChanges {
    @Input() menuItems;


    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        try {
            $.app.nav.init();
        } catch (e) {

        }

        try {
            $.app.menu.init();
        } catch (e) {

        }
    }


}
