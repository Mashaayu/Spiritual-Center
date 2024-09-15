import { DevoteePostModel } from "../../Model/Devotee.Model";
import { DonationModel } from "../../Model/Donation.Model";

export interface AdminState {
    DevoteeList : DevoteePostModel [],
    DonationList : DonationModel [] ,
    Error : string,
}

export const initialState : AdminState = {
    DevoteeList: [],
    DonationList: [],
    Error: ''
} 