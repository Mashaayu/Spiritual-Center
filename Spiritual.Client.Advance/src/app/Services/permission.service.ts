import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { ApiService } from './api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../States/app.state';
import { getUser } from '../States/User/user.selector';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private router: Router,private apiservice:ApiService,private store : Store<{appstate:AppState}>) {}
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
   
    let token : string | undefined = '';
    let role : string | undefined = '';

    this.store.select(getUser).subscribe((User)=>{
      token =  User?.token;
      role = User?.role;
    });

    if(token != undefined || token != null){
      this.apiservice.SetHttpHeader(token);
      
      if (((route.data as any).roles as string[]).includes(role))
           return true;

    }

    this.router.navigate(['login']);
    return false;
  }
}

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
 
) => {
  return inject(PermissionService).canActivate(route);
};
