import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router } from '@angular/router';
import { dateTwoMonthsLessFromTodayValidator } from '../../../Validators/dateLessThanTwoMonth';
import { DevoteePostModel } from '../../../Model/Devotee.Model';
import { DevoteeapiService } from '../../../Services/devoteeapi.service';
import { ItemService } from '../../dynamic-form/Services/item.service';
import { Observable } from 'rxjs';
import { ItemBase } from '../../dynamic-form/Models/ItemBase.classs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../States/app.state';
import { PostDevoteeAction } from '../../../States/Admin/admin.actions';
import { GetDevoteeList } from '../../../States/Admin/admin.selector';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css'
})
export class CreateuserComponent {

  UserImage: File;

  //dynamic form
  ButtonObj : any = {name : 'Create User',id : 'submit'}
  Items: Observable<ItemBase<string|number>[]> ;

  constructor(private store: Store<{appstate:AppState}>, private router: Router,
    private itermsService:ItemService
  ) {

  }
  ngOnInit(): void {
    this.Items = this.itermsService.getItems();
   
  }


  FileInput(obj: any) {
    this.UserImage = obj.UserImage;
  }
  
  CreateDevotee(DevoteeForm : FormGroup){
    
    let devotee: DevoteePostModel = { ...DevoteeForm.value, createdByID: 6, updatedById: 6, userImage: this.UserImage }

    let x = this.store.dispatch(PostDevoteeAction({Devotee:devotee}));
  

    this.store.select(GetDevoteeList).subscribe(
      res=>{
        console.log(res);
        this.router.navigate(["userlist"])
      }
    );
        // this.DevoteeService.PostDevotee(Devotee).subscribe(res => {
          
        //   this.router.navigate(["userlist"])
  
        // });
  }

}
