import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './Modules/admin/admin.module';
import { DevoteeModule } from './Modules/devotee/devotee.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';




@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    DevoteeModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers:[importProvidersFrom(HttpClientModule), provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
