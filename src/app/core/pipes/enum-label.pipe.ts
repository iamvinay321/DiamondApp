import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';
import {catchError, map, timeout} from "rxjs/operators";
import {of} from "rxjs";
import {ApiSdkService} from "../api-sdk/api-sdk.service";


@Pipe({
    name: 'constantLabel'
})
export class EnumLabelPipe implements PipeTransform {

    constructor(private api: ApiSdkService) {

    }

    transform(value: any, args?: any): any {
        if (!value) return;

        return this.api.system.enums.pipe(
            map(val => _.find(_.get(val, args), {key: value})['value']),
            timeout(2000),
            catchError(() => of(null))
        );
    }
}
