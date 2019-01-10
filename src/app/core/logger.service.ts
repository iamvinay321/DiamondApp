import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor() {
    }

    info(value: any, ...rest: any[]) {
        console.info(value, ...rest);
    }

    debug(value: any, ...rest: any[]) {
        console.debug(value, ...rest);
    }

    error(value: any, ...rest: any[]) {
        console.error(value, ...rest);
    }

    warn(value: any, ...rest: any[]) {
        console.warn(value, ...rest);
    }
}
