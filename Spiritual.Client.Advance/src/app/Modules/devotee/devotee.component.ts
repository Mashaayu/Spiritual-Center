import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../States/app.state';
import { getUser } from '../../States/User/user.selector';

@Component({
  selector: 'devotee-root',
  templateUrl: './devotee.component.html',
  styleUrl:'./devotee.component.css'
 })
export class DevoteeComponent implements OnInit{
devoteeID : string = "";
Openchat = false;
  constructor(private router: Router,private store : Store<{appState : AppState}>
  ,  private ele : ElementRef) {

  }
  ngOnInit(): void {
    this.store.select(getUser).subscribe((data)=>{
      if(data!=null || data!=undefined){
        this.devoteeID = data?.userName == undefined ? "" : data.userName;
      }
    })
  
  }
  
  LogOut() {
    
    this.router.navigate(['login']);
  }
  isActive(id:string) {
    let  navbtns : HTMLCollectionOf<Element> =   (<HTMLElement>this.ele.nativeElement).getElementsByClassName('navbtns');
      
      let i = 0;
      for(i=0;i<navbtns.length;i++){
        if(navbtns[+(i)].id == id){
          navbtns[+(i)].classList.add('active');
        }
        else{
          navbtns[+(i)].classList.remove('active');
        }
      }
    }

    CloseChat() {
      this.Openchat = false;
      }
}
