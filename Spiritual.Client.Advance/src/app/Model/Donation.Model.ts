import { DevoteePostModel } from "./Devotee.Model";

export interface Donation{
    donationAmount : number,
    year:number,
    month:number,
    devotee:DevoteePostModel,

    
}

export interface DonationModel {
    donationAmount : number,
    year:number,
    month:number,
    devoteeId:string,

}