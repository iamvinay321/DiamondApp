import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import * as _ from 'lodash';
import {User} from "./api-sdk/auth/user.interface";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    detail: BehaviorSubject<User>;

    constructor() {
        this.detail = new BehaviorSubject<any>(this.getDetailFromStorage());
    }


    get isAnonymous(): boolean {
        return _.isEmpty(this.detail.value);
    }


    setUser(user: User, forSessionOnly = true) {
        if (this.getDetailFromStorage() !== null)
            throw new Error('User is already set. Please call clear() and the set again.');

        this._setUser(user, forSessionOnly);
    }

    update(value: any) {
        let newVal = <User>_.merge(this.getDetailFromStorage(), value);
        this._setUser(newVal, newVal['forSessionOnly']);
    }

    clear() {
        sessionStorage.removeItem('u');
        localStorage.removeItem('u');

        this.detail.next(this.getDetailFromStorage());
    }

    private getDetailFromStorage(): User {
        let u = sessionStorage.getItem('u');
        u = _.isEmpty(u) ? localStorage.getItem('u') : u;

        return _.isEmpty(u) ? null : <User> JSON.parse(u);
    }

    private _setUser(user: User, forSessionOnly) {
        let storage = forSessionOnly === true ? sessionStorage : localStorage;
        user['forSessionOnly'] = forSessionOnly;
        storage.setItem('u', JSON.stringify(user));

        this.detail.next(user);
    }
}
