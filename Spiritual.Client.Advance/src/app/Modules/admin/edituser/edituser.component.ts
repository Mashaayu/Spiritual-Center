import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DevoteePostModel } from '../../../Model/Devotee.Model';
import { Observable } from 'rxjs';
import { ItemBase } from '../../dynamic-form/Models/ItemBase.classs';
import { ItemService } from '../../dynamic-form/Services/item.service';
import { Store } from '@ngrx/store';
import { AdminState } from '../../../States/Admin/admin.state';
import { UpdateDevoteeAction } from '../../../States/Admin/admin.actions';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent implements OnInit {

  UserID: number;
  UserImage: File;
  image: string = '';
  //dynamic form
  ButtonObj: any = { name: 'Edit User', id: 'submit' , userId : 0}
  Items: Observable<ItemBase<string | number>[]>;

  constructor(private store: Store<{adminState:AdminState}>, private router: Router,private route : ActivatedRoute,private itemService: ItemService) {
  }
  ngOnInit(): void {

   this.route.queryParams.subscribe(qp =>{
      this.ButtonObj.userId = qp['Id'];
      this.UserID = qp['Id']
    });
    this.Items = this.itemService.getItems();

    // this.image = this.devoteeSevice.DevoteeEdit.userImage.name;

  }

  FileInput(obj: any) {
    this.UserImage = obj.UserImage;
    this.image = obj.name;
  }

  EditDevotee(DevoteeForm: FormGroup) {

    let devotee: DevoteePostModel = { ...DevoteeForm.value, createdByID: 6, updatedById: 6, userImage: this.UserImage }

    // this.devoteeSevice.PutDevotee(Devotee, this.UserID).subscribe(res => {

    //   this.router.navigate(["admin/userlist"])

    // });
    this.store.dispatch(UpdateDevoteeAction({Devotee : devotee,Id:this.UserID}));
    this.router.navigate(['userlist']);
    
  }

}
