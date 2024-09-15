import { Injectable } from '@angular/core';
import { DevoteePostModel } from '../Model/Devotee.Model';
import { Donation, DonationModel } from '../Model/Donation.Model';

@Injectable({
  providedIn: 'root'
})
export class SortingAndFilteringService {
  url: any;
  y: string;

  constructor() {
    //this.x.devotee.devoteeLoginId
  }



  FilterDevoteeList(Devotees: DevoteePostModel[], inputSearch: string): Array<DevoteePostModel> {


    let data: DevoteePostModel[] = Devotees.filter(d => d.devoteeLoginId.trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase())
      || d.firstname.trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase()) ||
      d.middlename.trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase()) ||
      d.lastname.trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase()) ||
      d.area.trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase()) ||
      d.city.trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase()) ||
      d.state.trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase()) ||
      d.flatno.toString().trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase())
    );

    return data;

  }

  FilterDonationListModel(Donations: DonationModel[], inputSearch: string): DonationModel[] {

    let data: DonationModel[] = Donations.filter(d => 
       d.devoteeId.toString().trim().toLocaleLowerCase().includes(inputSearch.toString().trim().toLocaleLowerCase()) ||
        d.year.toString().includes(inputSearch.toString().trim())
        || d.month.toString().includes(inputSearch.toString().trim()) ||
        d.donationAmount.toString().includes(inputSearch.toString().trim())
    
    );
    
    return data;
  }

  FilterDonationList(Donations: Donation[], inputSearch: string): Donation[] {

    let data: Donation[] = Donations.filter(d => d.devotee.devoteeLoginId.trim().toLocaleLowerCase().includes(inputSearch.trim().toLocaleLowerCase()) ||
      d.year.toString().includes(inputSearch.trim())
      || d.month.toString().includes(inputSearch.trim()) ||
      d.donationAmount.toString().includes(inputSearch.trim())
    );
    return data;
  }


  //== x : Donation;

}
