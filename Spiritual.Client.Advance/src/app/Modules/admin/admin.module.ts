import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserlistComponent } from './userlist/userlist.component';
import { EdituserComponent } from './edituser/edituser.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { DonationComponent } from './donation/donation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule, provideStore } from '@ngrx/store';
import { AdminReducer } from '../../States/Admin/admin.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from '../../States/Admin/admin.effects';
import { SharedModule } from '../shared/shared.module';
import { ADMIN_STATE_NAME } from '../../States/Admin/admin.selector';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminComponent,
    UserlistComponent,
    EdituserComponent,
    CreateuserComponent,
    DonationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
     DynamicFormModule ,
    // StoreModule.forRoot({}),
    // EffectsModule.forRoot([]),
    StoreModule.forFeature(ADMIN_STATE_NAME,AdminReducer),
    EffectsModule.forFeature(AdminEffects),

  ],
  schemas:[

  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(),

  ],
})
export class AdminModule { }
