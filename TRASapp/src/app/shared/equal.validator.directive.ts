import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[Equalvalidate][formControlName],[formControl],[ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EqualValidator),
            multi: true
        }
    ]
})

export class EqualValidator implements Validator {

    constructor(@Attribute('Equalvalidate') public Equalvalidate: string,
                @Attribute('reverse') public reverse: string,
                @Attribute('validatepwd') public validatepwd: string) { }

     private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse === 'true' ? true: false;
    }  

    validate(abControl: AbstractControl): { [key: string]: any } {
        // Get self value( e.g. confirm password)
        let val = abControl.value;
        let np = abControl.value;

        // Get control value( e.g. new password)
        let cValue = abControl.root.get(this.Equalvalidate);
        let tp = abControl.root.get(this.validatepwd);

        // value not equal
        if (cValue && val !== cValue.value&&!this.isReverse){
            return {
                Equalvalidate: false
            }
        } 

        if (tp && np !== tp.value){
            return {
                validatepwd: false
            }
        } 

        // value equal and reverse
        if (cValue && val === cValue.value && this.isReverse) {
            delete cValue.errors['Equalvalidate'];
            if (!Object.keys(cValue.errors).length)cValue.setErrors(null);
        }
        
        // value not equal and reverse
        if (cValue && val !== cValue.value && this.isReverse) {
            cValue.setErrors({ Equalvalidate: false });
        }

        return null;
    }
}