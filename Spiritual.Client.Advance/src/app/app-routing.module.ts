import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from './Services/permission.service';

const routes: Routes = [
  // {
  //   path:'',redirectTo:'login',
  //   pathMatch: "full"
  // },
  {
    path:'login', 
    loadChildren :()=>import('./Modules/shared/shared.module').then((m)=>m.SharedModule),
    pathMatch: 'full'
  },
  {
    path:'admin',
    loadChildren : ()=> import('./Modules/admin/admin.module').then((m)=>m.AdminModule),
    canActivate: [canActivate],
    data: { roles: ['admin'] },
  },
  {
    path:'devotee',loadChildren:()=>import('./Modules/devotee/devotee.module').then((m)=>m.DevoteeModule),
    canActivate: [canActivate],
    data: { roles: ['devotee'] },
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
