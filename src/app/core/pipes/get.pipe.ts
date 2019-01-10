import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';


@Pipe({
    name: 'get',
    pure: true
})
export class GetPipe implements PipeTransform {

    transform(value: any, path: string, defaultValue: any = null): any {
        return _.get(value, path, defaultValue);
    }

}
