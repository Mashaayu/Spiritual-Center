import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation, DonationModel } from '../Model/Donation.Model';
import { Observable, catchError } from 'rxjs';
import { DevoteePostModel } from '../Model/Devotee.Model';
import { handleError } from '../ExceptionHandler/Exception.Handler';

@Injectable({
  providedIn: 'root'
})
export class DonationApiService {
  DonationURL :string = 'https://localhost:7194/donation';
  constructor(private httpClient:HttpClient) { }
  header : HttpHeaders;
  //Donations
  SetHttpHeader(UserToken : string){
    this.header = new HttpHeaders();
  
    this.header = this.header.set('Authorization','Bearer ' + UserToken);
  
  }
  PostDonation(donation : Donation):Observable<Donation>{
    console.log(donation.devotee.id , "requesting posT");
    return this.httpClient.post<Donation>(`${this.DonationURL}`,donation,{headers:this.header})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }
    
  GetDonationForDevotee(DevoteeId : number):Observable<Array<DonationModel>>{
    return this.httpClient.get<Array<DonationModel>>(`${this.DonationURL}/DevoteeDonation/${DevoteeId}`,{headers:this.header})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }

  GetDonationList() : Observable<Array<DonationModel>>{
    return this.httpClient.get<Array<DonationModel>>(this.DonationURL,{headers:this.header})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }

  GetDonationListDesc() : Observable<Array<DonationModel>>{
    return this.httpClient.get<Array<DonationModel>>(`${this.DonationURL}/desc`,{headers:this.header})
    .pipe(
      catchError(handleError) //imported from  /ExceptionHandler folder
    );
  }

  GetDevoteesNotPaidDonation():Observable<Array<DevoteePostModel>>{
      return this.httpClient.get<Array<DevoteePostModel>>(`${this.DonationURL}/Unpaid`,{headers:this.header})
      .pipe(
        catchError(handleError) //imported from  /ExceptionHandler folder
      );
  }
}
