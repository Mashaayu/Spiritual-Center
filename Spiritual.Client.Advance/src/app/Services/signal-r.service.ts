import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Store } from '@ngrx/store';
import { Observable, retry } from 'rxjs';
import { AppState } from '../States/app.state';
import { getUser } from '../States/User/user.selector';
import { Message, UserMessage } from '../Model/UserMessage';
import { AddtoGropModel, GroupMessage, GroupMessageModel } from '../Model/User.Model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection;
  constructor(private store: Store<{ appState: AppState }>) {

    this.store.select(getUser).subscribe((data) => {
      
      this.hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7194/hub/Userhub", {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,

          accessTokenFactory: () => data?.token == undefined ? "" : data.token,
        
        })
        .configureLogging(LogLevel.Information)
        .build();
    })

   
  }



  StartConnection(): Observable<void> {
    

    return new Observable<void>((observer) => {

      this.hubConnection.start()
        .then(() => {
          console.log("Connection established ,");
          observer.next();
          observer.complete();
        }).catch(() => {
          console.log("Connect get an errror");
          observer.error();
        });
        
    })
  }
  OnConnected() : Observable<Message[]>{
      return new Observable<Message[]>((observer)=>{
        this.hubConnection.on("OnConnected",(data)=>{
         
          observer.next(data);
        });
      });
  }

  AddToGroup( model : AddtoGropModel){
    this.hubConnection.invoke("AddToGroupAsync",model).catch((err:any)=>{
      console.log("Method Invocation Failed Error is : ",err)
    });
  }

  SendGroupMessage(message : GroupMessage,groupName : string){
    this.hubConnection.invoke("",message,groupName).catch((err:any)=>{
      console.log("Method Invocation Failed Error is : ",err)});
  }

  ReceiveGroupMessage() : Observable<GroupMessageModel>{
    return new Observable<GroupMessageModel>((observer)=>{
      this.hubConnection.on("ReceiveGroupMessage",(data)=>{
        observer.next(data);
      })
    });
  }

  GetMyGroupMessages(UserId : string):Observable<Array<GroupMessageModel>>{
    return new Observable<GroupMessageModel[]>((observer)=>{
      this.hubConnection.invoke("GetMyGroupMessages",UserId).then((data)=>{
        observer.next(data);
      }).catch((err)=>{
        console.log(err);
      })
    });
  }   
  StopConnection() {
    console.log("connection stopped");

    this.hubConnection.stop();
  }

  SendMessage(message: Message) {
    
    this.hubConnection.invoke("SendMessage", message).catch((err:any)=>{
      console.log("Method Invocation Failed Error is : ",err)});
  }

  ReceiveMessage(): Observable<Message> {
    return new Observable<Message>((observer) => {
      this.hubConnection.on("ReceiveMessage", (msg) => {        
        observer.next(msg);
      });
    })
  }

  SendNotification(message: string) {
    this.hubConnection.invoke("SendNotification", message).catch((err:any)=>{
      console.log("Method Invocation Failed Error is : ",err)});
  }

  ReceiveNotification(): Observable<string> {
    return new Observable<string>((observer) => {
      this.hubConnection.on("ReceiveNotification", (msg) => {
        observer.next(msg);
      });
    })
  }
}
