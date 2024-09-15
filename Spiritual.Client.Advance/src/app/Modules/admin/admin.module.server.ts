import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AdminModule } from './admin.module';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    AdminModule,
    ServerModule,
  ],
  bootstrap: [AdminComponent],
})
export class AdminServerModule {}
