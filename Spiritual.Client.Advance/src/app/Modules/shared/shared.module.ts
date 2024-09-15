import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterComponent } from './Components/Filter/filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from '../../States/User/user.effect';
import { UserReducer } from '../../States/User/user.reducer';
import { USER_STATE_NAME } from '../../States/User/user.selector';
import { SharedRoutingModule } from './shared-routing.module';
import { LiveChatWidgetModule } from '@livechat/widget-angular';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { GropChatComponent } from './grop-chat/grop-chat.component';
@NgModule({
  declarations: [
    FilterComponent,
    LoginComponent,
    ChatRoomComponent,
    ChatBoxComponent,
    GropChatComponent
  ],
  imports: [
   
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(USER_STATE_NAME,UserReducer),
    LiveChatWidgetModule,
    EffectsModule.forFeature(UserEffects) 
  ],
  exports: [
    FilterComponent,
    ChatRoomComponent,
    LoginComponent
  ],
  providers:[importProvidersFrom(HttpClientModule)]
})
export class SharedModule { }
