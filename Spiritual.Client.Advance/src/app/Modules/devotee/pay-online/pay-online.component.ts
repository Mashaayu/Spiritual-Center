import { Component } from '@angular/core';
import { Donation } from '../../../Model/Donation.Model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DevoteePostModel } from '../../../Model/Devotee.Model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../States/app.state';
import { GetDevoteeDataSelector, GetDevoteeState } from '../../../States/Devotee/devotee.selector.';
import { MakePaymentAcion } from '../../../States/Devotee/devotee.actions';

@Component({
  selector: 'app-pay-online',
  templateUrl: './pay-online.component.html',
  styleUrl: './pay-online.component.css'
})
export class PayOnlineComponent {
  DonationForm:FormGroup;
  Devotee:DevoteePostModel;
  monthFlag = false;
  YearFlag = false;


  constructor(private store : Store<{appState:AppState}>,private Router:Router){
    this.DonationForm = new FormGroup({
      Month:new FormControl('',Validators.required,),
      Year:new FormControl('',Validators.required),
      Amount:new FormControl('',[Validators.required,Validators.min(100)])
    });
  }
  ngOnInit(): void {
    this.store.select(GetDevoteeDataSelector).subscribe((data)=>{
      if(data!=null)  
         this.Devotee = data;
    });
    
  }
  get f():{[key:string]:AbstractControl}{
    return this.DonationForm.controls;
  }

  MakeDonation() {
    
    this.DonationForm.markAllAsTouched();
    this.DonationForm.updateValueAndValidity();

    
    if(this.DonationForm.valid){
      let  Donation :Donation = {

        donationAmount: this.DonationForm.get('Amount')?.value,
        year: this.DonationForm.get('Year')?.value,
        month: this.DonationForm.get('Month')?.value,
        devotee: this.Devotee,
  
      } 
     
      if(!this.YearFlag && !this.monthFlag){
        this.store.dispatch(MakePaymentAcion({Donation:Donation}));
        this.store.select(GetDevoteeState).subscribe((data)=>{
          if(data.Error == '' ){
            this.Router.navigate(['devotee/mypayments']);
          }
        });
      }
    }

  }
 


  OnChanges(y:string,m:string){
    let year : number = +(y);
    let month : number = +(m);

    let x = Date.parse(this.Devotee.initiationDate);
    let date = new Date(x);

    if( year == date.getFullYear() || year > date.getFullYear()){
      this.YearFlag = false;
      console.log("year flag:",this.YearFlag);
      
     
        if(month >= date.getMonth()){
          this.monthFlag = false;
        }else{
          this.monthFlag = true;
          
        }
    }
    else{
      this.YearFlag = true;
      console.log("year else flag:",this.YearFlag);
    }
  }

}
