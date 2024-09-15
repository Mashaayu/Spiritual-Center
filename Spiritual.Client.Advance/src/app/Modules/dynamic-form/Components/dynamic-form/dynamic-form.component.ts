import { Component, Input, Output, input } from '@angular/core';
import { Subject } from 'rxjs';
import { ItemBase } from '../../Models/ItemBase.classs';
import { FormGroup } from '@angular/forms';
import { ItemContolService } from '../../Services/item-contol.service';
import { DevoteeapiService } from '../../../../Services/devoteeapi.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../States/app.state';
import { ActivatedRoute, Routes } from '@angular/router';
import { GetDevoteeByIdSelector } from '../../../../States/Admin/admin.selector';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  @Input() Items: ItemBase<string | number>[] | null;
  form: FormGroup;
  @Input() ButtonObj: { name: string, id: string , userId : number | null};
  @Output() Submit$: Subject<FormGroup> = new Subject();
  @Output() FileInput$: Subject<any> = new Subject();
  @Input() img: string = "";

  constructor(private itemcontrolService: ItemContolService, private store: Store<{ appstate: AppState }>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.itemcontrolService.ConvertToFormGroup(this.Items as ItemBase<string | number>[]);

    if (this.ButtonObj.name == "Edit User") {


      if(this.ButtonObj.userId != null) {
        
        this.store.select(GetDevoteeByIdSelector, { id: this.ButtonObj.userId }).subscribe(
            res => {
              this.form.patchValue({
                ...res
              });

              console.log("Id :",res);
              if (res?.initiationDate != undefined) {
                let c: number = Date.parse(res.initiationDate);
                let y = new Date(c);
                let month = y.getMonth().toString().length != 2 ? `0${y.getMonth()}` : y.getMonth()

                this.form.patchValue({
                  "initiationDate": `${y.getFullYear()}-${month}-${y.getDate()}`,

                });
              }

            }
        )

      }


    }


  }

  OnSubmit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.Submit$.next(this.form);
    }
  }
  FileInput(obj: any) {
    this.FileInput$.next(obj);
  }

}
