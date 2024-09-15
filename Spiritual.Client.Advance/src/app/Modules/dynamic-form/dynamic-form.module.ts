import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './Components/dynamic-form/dynamic-form.component';
import { DynamicFormItemComponent } from './Components/dynamic-form-item/dynamic-form-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports : [
    DynamicFormComponent,DynamicFormItemComponent
  ]
})
export class DynamicFormModule { }
