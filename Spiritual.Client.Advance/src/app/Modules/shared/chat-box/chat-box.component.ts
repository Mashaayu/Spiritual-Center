import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../Model/UserMessage';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent{
    @Input() UserID :string;
    @Input() ActiveChatMessages : Array<Message>;
    @Input() Username : string;

    
} 
