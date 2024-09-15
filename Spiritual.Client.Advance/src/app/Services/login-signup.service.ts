import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../Model/User.Model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  User:User;
  constructor(private apiService:ApiService,private Router:Router) { }
  decodedToken:any = { email: '', aud: '', exp: '', iat: '', iss: '', jti: '', nbf: '', sub: '', role: '', unique_name: '' };
  UserRole = '';

  GetUserRole(username:string) : Observable<User>{

      return this.apiService.Login(username);
  }

  GetRole(role:string){
   
    return role;
  }
}
