import {FormControl, FormGroup} from "@angular/forms";
import * as _ from 'lodash';


export default class Utils {
    static validateAllFormFields(form: FormGroup) {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    /**
     * Replace template element in a string. Template element can be written between curly braces.
     * Template element will be looked into the object for replacement
     *
     * @param {string} string String to replaced
     * @param {object} obj any object where template string value should be picked up
     * @param {boolean} forceReplace if value is missing this will tell it to replace with blank str
     * @returns {string} Replaced string
     */
    static format(string, obj, forceReplace = true): string {
        const params = string.match(/{[^}.]+}/g);

        if (params === null) return string;

        params.forEach((str: String) => {
            let replacement = _.get(obj, str.replace(/[{}]/g, '')) || null;

            if (replacement === null && forceReplace == true) replacement = '';
            else if (replacement === null) replacement = str;

            string = string.replace(str, replacement);
        });

        return string;

    }

    static isSmallWindow() {
        return window.innerWidth < 1025;
    }
}
