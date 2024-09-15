import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevoteeRoutingModule } from './devotee-routing.module';
import { DevoteeComponent } from './devotee.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { PayOnlineComponent } from './pay-online/pay-online.component';
import { ProfileComponent } from './profile/profile.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { DEVOTEE_STATE_NAME } from '../../States/Devotee/devotee.selector.';
import { DevoteeReducer } from '../../States/Devotee/devotee.reducers';
import { EffectsModule } from '@ngrx/effects';
import { DevoteeeEffects } from '../../States/Devotee/devotee.effects';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
   DevoteeComponent,
   MyPaymentsComponent,
   PayOnlineComponent,
   ProfileComponent,
   
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    DevoteeRoutingModule,
    MatPaginator,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    MatButtonModule,
    DynamicFormModule,
    StoreModule.forFeature(DEVOTEE_STATE_NAME,DevoteeReducer),
    EffectsModule.forFeature(DevoteeeEffects)
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()],
})
export class DevoteeModule { }
