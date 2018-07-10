/* import { Directive, forwardRef, Attribute,ElementRef, Renderer,Input,HostListener } from '@angular/core';
import { NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[restrict]',
})
export class InputRestricter{


@Input('restrict_minvalue') minValue: number;
constructor(private el: ElementRef,private renderer: Renderer) {

}    
@HostListener('keyup',['$event']) onKeyUp(event){   
    if(this.minValue){
        let el = <HTMLSelectElement> event.target;
        if ($(el).val()).val() <= this.minValue) {
            el.setCustomValidity('Value is invalid');
        } else {
            el.setCustomValidity('');
        }
    }
} */