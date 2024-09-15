import { Component, OnInit } from '@angular/core';
import { DevoteePostModel } from '../../../Model/Devotee.Model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../States/app.state';
import { GetDevoteeDataSelector } from '../../../States/Devotee/devotee.selector.';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  devotee:DevoteePostModel;

  constructor(private store:Store<{appstate:AppState}>){
   
   
  }
  ngOnInit(): void {
    this.store.select(GetDevoteeDataSelector).subscribe((data)=>
    {
      if(data!=null)
        this.devotee = data;
    }); 

  }
}
