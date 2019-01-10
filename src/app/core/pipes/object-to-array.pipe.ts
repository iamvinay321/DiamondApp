import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
    name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!value) return;

        let arry = [];

        for (let k in value)
            arry.push({key: k, value: value[k]});

        return arry;
    }

}
