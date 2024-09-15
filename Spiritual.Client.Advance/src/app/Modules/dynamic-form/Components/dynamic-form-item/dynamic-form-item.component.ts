import { Component, Input, OnInit, Output, input } from '@angular/core';
import { ItemBase } from '../../Models/ItemBase.classs';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html',
  styleUrl: './dynamic-form-item.component.css'
})
export class DynamicFormItemComponent {


  @Input() Item: ItemBase<string | number>;
  @Input() form: FormGroup;
  @Input() img :string;
  @Output() FileInput$ : Subject<any> = new Subject();
  constructor() {
  
  }

  

  FileInput(target : any){
    let obj =  {
      UserImage : target.files[0],
      image : target.files[0].name
    }
    this.img = obj.image;
    this.FileInput$.next(obj);
  }

  get f(): { [key: string]: AbstractControl }  {
    return this.form.controls;
    
  }

  hasError(key: string, error: string): boolean {
    return this.form.get(key)?.hasError(error) ? true : false;
  }

}
