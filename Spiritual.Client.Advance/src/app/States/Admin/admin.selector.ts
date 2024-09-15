import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.state";
import { DevoteePostModel } from "../../Model/Devotee.Model";

export const ADMIN_STATE_NAME = 'AdminState';

export const getAdminState = createFeatureSelector<AdminState>(ADMIN_STATE_NAME);
export const getAdminstatess = createSelector(getAdminState,(state)=>{
    return state;
})
export const GetDevoteeList = createSelector(
    getAdminState,(state)=>{
        return state.DevoteeList;
    }
);

export const GetDevoteeListDesc = createSelector(
    getAdminState,(state)=>{
        return state.DevoteeList;
    }
);

export const GetDonationList = createSelector(
    getAdminState,(state)=>{
        return state.DonationList;
    }
)

export const GetDonationListDesc = createSelector(
    getAdminState,(state)=>{
        return state.DonationList;
    }
)
export const GetDevoteeByIdSelector = createSelector(
    getAdminState,(state:AdminState,prop : {id : number}) =>{
    
        let data = state.DevoteeList.find((data)=>{
            return data.id === prop.id ? data : null
        });
          
        state.DevoteeList.forEach(devotee => {
            if(devotee.id == prop.id){
               data = devotee;
            }
        });

        console.log("data is : ",data)
        return data;
    }

);

export const GetDevoteeNotPaidDonation = createSelector(
    getAdminState,(state)=>{
        let devoteeIDsHaveNotPaidDonation : string [] =  state.DonationList.map((donation)=>{
            return donation.devoteeId;
        });

        let  DevoteesNotPaidDonations : DevoteePostModel[] = 
            state.DevoteeList.filter((devotee)=>{
                return !devoteeIDsHaveNotPaidDonation.includes(devotee.devoteeLoginId)
        });

        return DevoteesNotPaidDonations;
        
    }
)
