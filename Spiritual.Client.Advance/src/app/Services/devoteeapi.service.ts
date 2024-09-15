import { Injectable } from '@angular/core';
import { DevoteePostModel } from '../Model/Devotee.Model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { handleError } from '../ExceptionHandler/Exception.Handler';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { UserIDs } from '../Model/User.Model';

@Injectable({
  providedIn: 'root'
})
export class DevoteeapiService {

  URL: string = 'https://localhost:7194/devotee';
  constructor(private httpClient:HttpClient,private Router:Router) { 

    this.header = new HttpHeaders();
  }
  DevoteeEdit:DevoteePostModel;
  header : HttpHeaders;
  options : HttpParams;
  SetHttpHeader(UserToken : string){
    this.header = this.header.set('Authorization','Bearer ' + UserToken);


  //  this.options =   new HttpParams().set('name', 'XYZSW');
  
  }

  DevoteeLogin(username:string):Observable<DevoteePostModel>{
    return this.httpClient.post<DevoteePostModel>(`${this.URL}/DevoteeLogin`,{username})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );

  }

  PostDevotee(devotee: DevoteePostModel): Observable<DevoteePostModel> {

    const formData = new FormData();
    for(let key in devotee){
      const value : string | Blob = (devotee as any)[key]
      formData.set(key, value)
    }

    return this.httpClient.post<DevoteePostModel>(this.URL, formData,{headers:this.header})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }

  GetactiveDevotees():Observable<UserIDs[]>{
    return this.httpClient.get<UserIDs[]>(`${this.URL}/ActiveUsers`,{headers:this.header})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }


  EditDevotee(devoteeId : number){
    this.GetAescOrder().subscribe(async res=>
     await  [...res].forEach((devotee)=>{
        
        if(devotee.id == devoteeId){
         
          this.DevoteeEdit = devotee;
          this.Router.navigate(['admin/edituser']);
        }
      })
    );
    console.log('edit devotee config');
    
    // this.DevoteeEdit = devotee;
  }

  
  PutDevotee(devotee : DevoteePostModel,userId:number|undefined){
    const formData = new FormData();
    for(let key in devotee){
      const value : string | Blob = (devotee as any)[key]
      formData.set(key, value)
    }
    
    if(userId!=undefined){
        userId = +(userId);
    }
    console.log();
    return this.httpClient.put<DevoteePostModel>(`${this.URL}/${userId}`,formData,{headers:this.header},)
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }


  GetAescOrder() :Observable<Array<DevoteePostModel>>{
    
    return this.httpClient.get<Array<DevoteePostModel>>(this.URL,{headers:this.header})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    ); 

  }

  GetDescOrder() :Observable<Array<DevoteePostModel>>{
    return this.httpClient.get<Array<DevoteePostModel>>(`${this.URL}/desc`,{headers:this.header})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }

  
  DeleteDevotee(id:number | undefined):Observable<Array<DevoteePostModel>> {
    return this.httpClient.delete<Array<DevoteePostModel>>(`${this.URL}/${id}`,{headers:this.header}).pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );;
  }

}
