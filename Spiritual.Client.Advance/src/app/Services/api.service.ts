import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { DevoteePostModel } from '../Model/Devotee.Model';
import { User } from '../Model/User.Model';
import { handleError } from '../ExceptionHandler/Exception.Handler';
import { DonationApiService } from './donation-api.service';
import { DevoteeapiService } from './devoteeapi.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  AccountURL : string = 'https://localhost:7194/Account';
  DevoteeEdit:DevoteePostModel;
  header : HttpHeaders;
  constructor(private httpClient: HttpClient,private donationService:DonationApiService,private devoteeService:DevoteeapiService) {
    this.header = new HttpHeaders();
    
  }
 
  SetHttpHeader(UserToken : string){
   
    // const UserToken  = localStorage.getItem('token');
    // console.log('tokeni is',UserToken)
    this.header = this.header.set('Authorization','Bearer ' + UserToken);
    this.donationService.SetHttpHeader(UserToken);
   this.devoteeService.SetHttpHeader(UserToken);
  
  }

  Login(username:string):Observable<User>{

    return this.httpClient.post<User>(`${this.AccountURL}/login`,{username})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }
  
}
