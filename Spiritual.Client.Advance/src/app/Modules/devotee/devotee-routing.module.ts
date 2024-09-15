import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { PayOnlineComponent } from './pay-online/pay-online.component';
import { ProfileComponent } from './profile/profile.component';
import { canActivate } from '../../Services/permission.service';
import { DevoteeComponent } from './devotee.component';

const routes: Routes = [
 
      {
        path:'',component:DevoteeComponent,
        children:[
          {
            path : '',redirectTo : 'mypayments',
            pathMatch:'full'
          },
          {
            path:'mypayments',component:MyPaymentsComponent,
            canActivate: [canActivate],
            data: { roles: ['devotee'] },
          },
          {
            path:'payonline',component:PayOnlineComponent,
            canActivate: [canActivate],
            data: { roles: ['devotee'] },
          },
          {
            path:'profile',component:ProfileComponent,
            canActivate: [canActivate],
            data: { roles: ['devotee'] },
          }
        ]
      },
      
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevoteeRoutingModule { 



}
