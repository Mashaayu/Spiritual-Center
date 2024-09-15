import { Component, ElementRef, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { Message } from '../../../Model/UserMessage';
import { Store } from '@ngrx/store';
import { AppState } from '../../../States/app.state';
import { SignalRService } from '../../../Services/signal-r.service';
import { GroupMessageModel, UserIDs } from '../../../Model/User.Model';
import { GetActiveUsers } from '../../../States/User/user.action';
import { Getactiveusers } from '../../../States/User/user.selector';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent implements OnInit {

  @Output() close$: Subject<void> = new Subject<void>();
  @Input() ReceivedMSg: string;
  @Input() isAdmin: boolean;
  @Input() UserId: string;
  UserName: string = '';
  
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  activechat: UserIDs = {
    id: '', name: ''
  };
  UserMessage: string = '';
  NotificationMessage: string = "";

  msgBox = true;
  notification = false;
  showChats = true;
  chats = true;
  chatRoom = false;
  ActivechatUsers: UserIDs[] = [];
  Users: UserIDs[] = [];
  MyMessages: Array<Message> = new Array<Message>();
  ActiveChatMessages: Array<Message> = new Array<Message>();
  MyGroups : Array<GroupMessageModel> = new Array<GroupMessageModel>();

  constructor(private store: Store<{ appstate: AppState }>, private signalRservice: SignalRService, private ele: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

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

    this.store.dispatch(GetActiveUsers());
    this.store.select(Getactiveusers).subscribe((data) => {
      data.forEach((user) => {
        if (user.id == this.UserId) {
          this.UserName = user.name;
        }
      })
      this.Users = data;
    });
    //to be implemented
    this.signalRservice.StartConnection().subscribe(() => {

    });
    this.signalRservice.OnConnected().subscribe((data) => {
      this.MyMessages = data;
      this.ConfigureActiveChatUser();
      
    });

    this.signalRservice.GetMyGroupMessages(this.UserId).subscribe((data)=>{
      this.MyGroups = data; 
    })

    this.receiveMessage();
  }

  CloseChats() {
    this.close$.next();
  }
  OpenChatRoomandChat(id: string) {


    let chatbtn = (<HTMLElement>this.ele.nativeElement).querySelector('#allchat');
    let chatRoombtn = (<HTMLElement>this.ele.nativeElement).querySelector('#chatroom');
    let notifybtn = (<HTMLElement>this.ele.nativeElement).querySelector('#notify');

    if (id == 'chatroom') {


      this.chatRoom = true;
      this.chats = false;
      this.notification = false;
      chatbtn?.classList.remove('open');
      chatRoombtn?.classList.add('open');
      notifybtn?.classList.remove('open');

    } else if (id == 'allchat') {

      this.chatRoom = false;
      this.chats = true;
      this.notification = false;
      chatbtn?.classList.add('open');
      chatRoombtn?.classList.remove('open');
      notifybtn?.classList.remove('open');

    } else {

      this.chatRoom = false;
      this.chats = false;
      this.notification = true;
      chatbtn?.classList.remove('open');
      chatRoombtn?.classList.remove('open');
      notifybtn?.classList.add('open');

    }

  }

  OnSelectuser(UserId: string) {
    let UserAlreadyInChat = false;
    this.ActivechatUsers.forEach(user => {
      if (user.id == UserId) {
        UserAlreadyInChat = true;
      }
    });

    this.Users.forEach((x) => {
      if (x.id == UserId && !UserAlreadyInChat) {
        let user: UserIDs = {
          id: x.id,
          name: x.name
        }
        this.ActivechatUsers.push(user);
        this.ActivateUser(user);
      }
    });
  }

  OpenUserChat() {
    this.msgBox = false;
    this.showChats = true;
  }

  SendMessage() {

    let Message: Message = {
      sender: this.UserId == "admin" ? 'admin' : this.UserName,
      senderID: this.UserId,
      receiver: this.activechat.name,
      receiverID: this.activechat.id,
      messageText: this.UserMessage,
      time: new Date()
    }
    this.UserMessage = '';
    this.signalRservice.SendMessage(Message);
    this.MyMessages.push(Message);
    this.ActiveChatMessages.push(Message);
   
  }

  ActivateUser(user: UserIDs) {
    if(user.id != this.UserId)
    {this.activechat = user;
    this.ConfigureActivechatMessages(user);}
  }

  private isUserActive(userId: string): boolean {
    return this.ActivechatUsers.some(user => user.id === userId);
  }
  ConfigureActiveChatUser() {

    for (let i = 0; i < this.MyMessages.length; i++) {
      let msg: Message = this.MyMessages[i];
      let otherUserId = msg.senderID === this.UserId ? msg.receiverID : msg.senderID;
      let otherUserName = msg.receiver === this.UserName ? msg.sender : msg.receiver;

      if (!this.isUserActive(otherUserId)) {
        let x: UserIDs = {
          id: otherUserId,
          name: otherUserName

        };
        this.ActivechatUsers.push(x);
        this.ConfigureActivechatMessages(x);
      
      }
    }

  }

  ConfigureActivechatMessages(activeUser: UserIDs) {

    this.ActiveChatMessages = [];
    this.MyMessages.forEach((msg) => {
      if (msg.senderID == activeUser.id  || msg.receiverID == activeUser.id ) {
        console.log("if condition result : ",msg.senderID == activeUser.id  || msg.receiverID == activeUser.id );
        
        this.ActiveChatMessages.push(msg);
      }

    });
    console.log('active chat messaeges : ',this.ActiveChatMessages);
  }

  

  receiveMessage() {

    let box1 = (<HTMLElement>this.ele.nativeElement).querySelector("#display-notifications")
    this.signalRservice.ReceiveNotification().subscribe((data) => {

      let p = this.renderer.createElement('p');
      p.innerHTML = `${data}`;
      p.className = 'alert alert-primary';
      box1?.append(p);
    });

    this.signalRservice.ReceiveMessage().subscribe((data) => {
      this.activechat = {id :data.senderID , name: data.senderID}
      this.MyMessages.push(data);
   
      this.ConfigureActiveChatUser();
      this.ConfigureActivechatMessages(this.activechat)

    });

  }

  sendNotification() {

    this.signalRservice.SendNotification(this.NotificationMessage);
    this.NotificationMessage = '';
  }
}
