import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../States/app.state';
import { GetDevoteesAction } from '../../States/Admin/admin.actions';
import { ClearUserState } from '../../States/User/user.action';
@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  styleUrl:'./admin.component.css'
})
export class AdminComponent implements OnInit{


  Openchat = false;
  
  constructor(private router: Router,private store : Store<{appState:AppState}>,
    private ele : ElementRef
  ) {

  }
  ngOnInit(): void {
    this.store.dispatch(GetDevoteesAction());
    // this.router.navigate(['admin/userlist'])
  }
  LogOut() {
    this.store.dispatch(ClearUserState())
    this.router.navigate(['login']);
  }

  isActive(id:string) {

  let  navbtns : HTMLCollectionOf<Element>  = ( <HTMLElement>this.ele.nativeElement).getElementsByClassName("navbtns") ;
  
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
  OpenChatBox() {
    this.Openchat = true;
  
  }
  CloseChat(){
    this.Openchat = false;
  }

  isResponsive: boolean = false;
  toggleResponsive() {
    this.isResponsive = !this.isResponsive;
  }

}
