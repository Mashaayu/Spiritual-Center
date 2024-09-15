import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { EdituserComponent } from './edituser/edituser.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { DonationComponent } from './donation/donation.component';
import { canActivate } from '../../Services/permission.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [

  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '', 
        redirectTo: 'userlist',
        pathMatch: 'full'
      },
      {
        path: 'userlist', 
        component: UserlistComponent,
        canActivate: [canActivate],
        data: { roles: ['admin'] },
      },
      {
        path: 'edituser', 
        component: EdituserComponent,
        canActivate: [canActivate],
        data: { roles: ['admin'] },
      },
      {
        path: 'createuser', component: CreateuserComponent,
        canActivate: [canActivate],
        data: { roles: ['admin'] },
      },
      {
        path: 'donations', component: DonationComponent,
        canActivate: [canActivate],
        data: { roles: ['admin'] },
      }
    ],
    canActivate: [canActivate],
    data: { roles: ['admin'] }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {


}
