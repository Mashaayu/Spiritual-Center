import { DevoteePostModel } from "../../Model/Devotee.Model";
import { DonationModel } from "../../Model/Donation.Model";

export interface DevoteeState {
    DevoteeData : DevoteePostModel | null,
    DevoteePayments : DonationModel[],
    Error : string,
  
}

export const initialState : DevoteeState = {
    DevoteeData: null,
    DevoteePayments: [],
    Error : '',
   
}