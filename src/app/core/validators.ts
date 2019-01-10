import {AbstractControl, FormControl, ValidatorFn} from "@angular/forms";


export class ExValidators {
    static number(control: FormControl) {
        if (control.value && control.value.toString().match(/^\d+(\.\d{1,2})?$/))
            return null;
        else
            return {number: true}
    }

    static fieldMatchValidator(formControlNames: string[],
                               message: string | true,
                               negative: boolean = false): ValidatorFn {
        if (formControlNames.length < 2) {
            throw new Error('Field match validator requires at least 2 fields');
        }

        negative = !!negative;

        return (control: AbstractControl) => {
            const primaryControl = control.get(formControlNames[0]);
            const theTruth = primaryControl && primaryControl.value;

            for (let i = 1, len = formControlNames.length; i < len; i++) {
                const child = control.get(formControlNames[i]);
                if (child) {
                    const notMatched = theTruth !== child.value;
                    const errors = child.errors || {};

                    if ((notMatched && !negative) || (!notMatched && negative)) {
                        errors['fieldMatchValidator'] = message;
                    } else {
                        delete errors['fieldMatchValidator'];
                    }

                    child.setErrors(Object.keys(errors).length ? errors : null);
                }
            }
            return {};
        }
    }
}
