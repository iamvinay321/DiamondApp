import {Injectable, ViewContainerRef} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, tap} from "rxjs/operators";


interface Breadcrumb {
    title: string;
    routerLink?: string;
}


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(private router: Router) {
        this.clearActionContainer();
    }

    private _pageTitle: string;

    get pageTitle() {
        return this._pageTitle;
    }

    private _breadcrumb: Array<Breadcrumb>;

    get breadcrumb() {
        return this._breadcrumb;
    }

    private _actionContainer: ViewContainerRef;

    set actionContainer(value) {
        if (this._actionContainer)
            throw Error('Already set');
        this._actionContainer = value;
    }

    updatePageTitle(pageTitle: string) {
        this._pageTitle = pageTitle;
    }

    updateBreadcrumb(breadcrumb: Array<Breadcrumb>) {
        setTimeout(() => this._breadcrumb = breadcrumb, 0);
    }

    setActionTemplate(tpl) {
        this._actionContainer.clear();
        this._actionContainer.createEmbeddedView(tpl);
    }

    private clearActionContainer() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .pipe(tap(() => {
                try {
                    this._actionContainer.clear();
                } catch (e) {

                }
            }))
            .subscribe()
    }
}
