import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { AddtoGropModel, GroupMessage, GroupMessageModel, UserIDs } from '../../../Model/User.Model';
import { SignalRService } from '../../../Services/signal-r.service';


@Component({
  selector: 'app-grop-chat',
  templateUrl: './grop-chat.component.html',
  styleUrl: './grop-chat.component.css'
})
export class GropChatComponent implements OnInit{
  GroupForm : boolean  = false;
  showChats = true;
  msgBox = true;
  ActiveGroup : GroupMessageModel ;
  Message : string ;
  AddtogroupModel : AddtoGropModel;
  GroupNameInput:string;
  UserName : string;

  @Input() UserId :string;
  @Input() isAdmin : boolean;
  @Input() Users : Array<UserIDs>;
  @Input() MyGroups : Array<GroupMessageModel>;

  selectedUsers : Array<UserIDs> =[];
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  
  constructor(private signalRservice : SignalRService) {
    
  }

  ngOnInit(): void {
    this.ActiveGroup.groupName = '';
    this.ActiveGroup.messages = [];
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(() => {

      if (window.innerWidth >= 600) {
        this.msgBox = true;
        this.showChats = true;
      } else {
        this.msgBox = true;
        this.showChats = false;
      }

    });
    this.Users.forEach(user => {
      if(user.id == this.UserId){
        this.UserName = user.name
      }
    });
    this.ActiveGroup = this.MyGroups[0]
    
    this.signalRservice.ReceiveGroupMessage().subscribe((data)=>{
        this.ActivateGroup(data);
    });
  }

  OpenUserChat() {
    this.msgBox = false;
    this.showChats = true;
  }

  OnUserSelect(userId  : string){
    let user  :UserIDs = this.Users.find((user)=>{
         return user.id == userId
      }) as UserIDs;

      let isUserAlreadyInList :boolean = this.selectedUsers.some((user)=>user.id == userId);

      if(!isUserAlreadyInList){
      
        this.selectedUsers.push (user);
      }

      if(this.AddtogroupModel.gropName == this.GroupNameInput){
          this.AddtogroupModel.members.push(user.id);
      }else{
        this.AddtogroupModel.gropName = this.GroupNameInput;
        this.AddtogroupModel.members.push(user.id);
      }
  } 

  UnSelectUser(userId : string){
    this.selectedUsers = this.selectedUsers.filter((t) => t.id !== userId)
    this.AddtogroupModel.members = this.AddtogroupModel.members.filter((m)=>{
        m != userId
    });
  }

  OpenGroupForm(){
    this.GroupForm = true;
  } 

  ActivateGroup(group : GroupMessageModel){
    this.ActiveGroup = group;
  }

  CloseGropFrom(){
    this.GroupForm = false;
  }

  CreateGroup(){
    
     this.GroupForm = false;
      this.selectedUsers = [];
      this.signalRservice.AddToGroup(this.AddtogroupModel);
      this.AddtogroupModel.gropName = '';
      this.AddtogroupModel.members = [];
      this.GroupNameInput = ''
  }
  SendGroupMessage(){
     let GroupMsg : GroupMessage = {
        sender : this.UserName,
        senderID : this.UserId,
        message : this.Message,
        time : new Date()
     }

     this.signalRservice.SendGroupMessage(GroupMsg,this.ActiveGroup.groupName);
  }
}
