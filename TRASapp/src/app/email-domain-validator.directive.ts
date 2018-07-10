
   import {  
    ReactiveFormsModule,  
    NG_VALIDATORS,  
    FormsModule,  
    FormGroup,  
    FormControl,  
    ValidatorFn,  
    Validator  
   } from '@angular/forms';  
   import { Directive } from '@angular/core';  
   @Directive({  
    selector: '[emailDomainValidator][ngModel]',  
    providers: [  
     {  
      provide: NG_VALIDATORS,  
      useExisting: EmailDomainValidatorDirective,  
      multi: true  
     }  
    ]  
   })  
   export class EmailDomainValidatorDirective implements Validator {  
    validator: ValidatorFn;  
    constructor() {  
     this.validator = this.emailDomainValidator();  
    }  
    validate(control: FormControl) {  
     return this.validator(control);  
    }  
   
    emailDomainValidator(): ValidatorFn {  
     return (control: FormControl) => { 
      let email = control.value; 
      if (email && email.indexOf("@") != -1) { 
        let [_, domain] = email.split("@"); 
        if (domain !== "braunweiss.net") { 
          return {
            emailDomain: {
              parsedDomain: domain
            }
          }
        }
      }
    }  
   }
  }
  
