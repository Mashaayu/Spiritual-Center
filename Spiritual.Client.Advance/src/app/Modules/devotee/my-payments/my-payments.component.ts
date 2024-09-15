import { Component, OnInit } from '@angular/core';
import { DonationModel } from '../../../Model/Donation.Model';
import { SortingAndFilteringService } from '../../../Services/sorting-and-filtering.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../States/app.state';
import { GetDevoteeDataSelector, GetMyPaymentListSelector } from '../../../States/Devotee/devotee.selector.';
import { GetPaymentListAction } from '../../../States/Devotee/devotee.actions';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrl: './my-payments.component.css'
})
export class MyPaymentsComponent implements OnInit {
  // inputSearch: string;
  elementID: string;
  p: string|number|undefined;
  MyDonationList: Array<DonationModel>;
  originalPaymentList : DonationModel[];
  DevoteeID: number | undefined;

  constructor(private store: Store<{appState:AppState}>,private sortingAndFilteringService:SortingAndFilteringService) {
    
  }

  ngOnInit(): void {

    this.store.select(GetDevoteeDataSelector).subscribe((data)=>{
      this.DevoteeID = data?.id;
    });
    this.store.dispatch(GetPaymentListAction({devoteeId:this.DevoteeID != undefined ? this.DevoteeID : 0 })); //get Paymet lists
    this.store.select(GetMyPaymentListSelector).subscribe((data)=>{
      this.MyDonationList = data;
      this.originalPaymentList = data;
    })

  }
  OnSearch(inputSearch: string) {

    let data = this.sortingAndFilteringService.FilterDonationListModel(this.originalPaymentList,inputSearch);
    this.MyDonationList = data; 
  }

  OrderByAsc() {
    this.MyDonationList.sort();

    console.log("ASC",this.MyDonationList);
   
  }

  OrderByDesc() {

    this.MyDonationList.reverse();
    console.log("Desc",this.MyDonationList);
   
  }
 
  style(amount: number): { [key: string]: string } {
    if (amount > 10000) {
      return { ['backgroundColor']: 'green', ['color']: 'white' }
    }
    return { ['backgroundColor']: 'white', ['color']: 'black' }
  }

}
