import { Injectable } from '@angular/core';
import { ItemBase } from '../Models/ItemBase.classs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateTwoMonthsLessFromTodayValidator } from '../../../Validators/dateLessThanTwoMonth';

@Injectable({
  providedIn: 'root'
})
export class ItemContolService {

  constructor() { }

  ConvertToFormGroup(Items : ItemBase<string | number>[]) : FormGroup{
    const formGroup : any = {};
    Items.forEach(Item=>{
        let i:number = 0;
        let validators  = [];
      

        for(i=0;i<Item.validators.length;i++){

          let value  = Item.validators[i].value;
          let validator  = Item.validators[i].validator;

            if(validator == 'required'){
              validators.push(Validators.required);
            }
            if(validator == 'minLength'){
              validators.push(Validators.minLength(value));
            }
            if(validator == 'maxLength'){
              validators.push(Validators.maxLength(value));
            }
            if(validator == 'pattern'){
              validators.push(Validators.pattern(value));
            }
            if(validator == 'dateTwoMonthsLessFromTodayValidator'){
              validators.push(dateTwoMonthsLessFromTodayValidator());
            }
            if(validator == 'min'){
              validators.push(Validators.min(value));
            }
        } 
        formGroup[Item.key] = new FormControl(Item.value,validators);
    })
    return new FormGroup(formGroup);
  }
}
