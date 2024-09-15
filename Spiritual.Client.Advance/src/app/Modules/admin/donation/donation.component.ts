import { Component, OnInit } from '@angular/core';
import { DevoteePostModel } from '../../../Model/Devotee.Model';
import { Donation, DonationModel } from '../../../Model/Donation.Model';
import { SortingAndFilteringService } from '../../../Services/sorting-and-filtering.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../States/app.state';
import { GetDevoteeNotPaidDonation, GetDonationList, GetDonationListDesc } from '../../../States/Admin/admin.selector';
import { GetDonationListAction, GetDonationListDESCAction } from '../../../States/Admin/admin.actions';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent implements OnInit {
  inputSearch: string;
  UnpaidDevotees: Array<DevoteePostModel>;
  OriginalUnpaidDevotees : Array<DevoteePostModel>;

  Donations: DonationModel [] = [];
  OriginalDonations : DonationModel [] = [];

  val: boolean = false;
  color: string = 'green';
  d: string|number|undefined;

  constructor(
    private store:Store<{appstate:AppState}>,
    private sortingAndFilteringservice: SortingAndFilteringService) {
   
  }

  ChangeList() {
    if (this.val == true) {
      this.val = false
    }
    else {
      this.val = true
    }
  }

  ngOnInit(): void {

    this.store.select(GetDevoteeNotPaidDonation).subscribe(
      res =>
     { this.UnpaidDevotees = res ;
        this.OriginalUnpaidDevotees = res;
     }
    );

    this.store.dispatch(GetDonationListAction());
    this.store.select(GetDonationList).subscribe(
      res=>{
        this.Donations = res;
        this.OriginalDonations = res;
      }
    );
  
  }

  style(amount: number): { [key: string]: string } {
    if (amount > 10000) {
      return { ['backgroundColor']: 'green', ['color']: 'white' }
    }
    return { ['backgroundColor']: 'white', ['color']: 'black' }
  }

  OnSearch() {

    if (this.val) {
      let data: DevoteePostModel[] = this.sortingAndFilteringservice.FilterDevoteeList(this.OriginalUnpaidDevotees, this.inputSearch);
      this.UnpaidDevotees = data;
    }
     else 
     {
      let data2: DonationModel[]  = this.sortingAndFilteringservice.FilterDonationListModel(this.OriginalDonations, this.inputSearch);
      this.Donations = data2;
    }

  }

  OrderByDesc() {
    if (!this.val) {
      this.store.dispatch(GetDonationListDESCAction());
      this.store.select(GetDonationListDesc).subscribe(
        res=>{
          this.Donations = res;
        }
      )
    } 
    else {
      this.UnpaidDevotees.sort();
    }
  }

  OrderByASC() {
    if (!this.val) {
      
      this.store.dispatch(GetDonationListAction());
      this.store.select(GetDonationList).subscribe(
        res=>{
          this.Donations = res;

        }
      )
    }else{
      this.UnpaidDevotees.reverse();
    }
  }

}
