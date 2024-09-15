import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DevoteePostModel } from '../../../Model/Devotee.Model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SortingAndFilteringService } from '../../../Services/sorting-and-filtering.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../States/app.state';
import { GetDevoteeList, GetDevoteeListDesc } from '../../../States/Admin/admin.selector';
import { DeleteDevoteeAction, GetDevoteesAction, GetDevoteesDescAction } from '../../../States/Admin/admin.actions';
import { Observable, Subscriber, of } from 'rxjs';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit{


  Devotees: Array<DevoteePostModel>;
  OrigionalDevoteeList: Array<DevoteePostModel>;

  p: string|number|undefined;

  constructor( private Router: Router,
    private sortingService:SortingAndFilteringService,private store : Store<{appState:AppState}>
  ) {
  }

  ngOnInit(): void { 
    this.store.select(GetDevoteeList).subscribe((data)=>{
      if(data!=null){
        this.Devotees = data;
        this.OrigionalDevoteeList = data;
      }
    });
  }

  EditUser(id:number){
    this.Router.navigate(['admin/edituser'],{queryParams : {'Id': id}});
  } 


  OrderByAsc() {
    this.store.dispatch(GetDevoteesAction());
    this.Devotees = []
    this.store.select(GetDevoteeList).subscribe( (data)=>{
      if(data!=null){
         this.Devotees = data;
      }
    });
  }
  OrderByDesc() {

    this.store.dispatch(GetDevoteesDescAction());
    this.Devotees = []
    this.store.select(GetDevoteeListDesc).subscribe((data)=>{
       this.Devotees = data
    });
  }

Onsearch(inputSearch:string){

    let data : DevoteePostModel[] = this.sortingService.FilterDevoteeList(this.OrigionalDevoteeList,inputSearch);

    this.Devotees = data;
  }

  DeleteUser(id:number){
    this.store.dispatch(DeleteDevoteeAction({Id:id}));
    
  }

}
