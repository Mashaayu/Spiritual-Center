import { createAction, props } from "@ngrx/store";
import { DevoteePostModel } from "../../Model/Devotee.Model";
import { DonationModel } from "../../Model/Donation.Model";


export enum AdminActions{

    GET_DEVOTEES_ACTION = '[ADMIN PAGE] Get Devotee',
    GET_DEVOTEES_SUCESS_ACTION = '[ADMIN PAGE] Get Devotee Sucess',
    GET_DEVOTEES_FAIL_ACTION = '[ADMIN PAGE] Get Devotee Fail',
    
    GET_DEVOTEES_DESC = '[ADMIN PAGE] Get Devotee Desc',
    GET_DEVOTEES_DESC_SUCESS = '[ADMIN PAGE] Get Devotee Desc Sucess',
    GET_DEVOTEES_DESC_FAIL = '[ADMIN PAGE] Get Devotee Desc Fail',

    POST_DEVOTEE_ACTION = '[ADMIN PAGE] Post Devotee',
    POST_DEVOTEE_SUCESS_ACTION = '[ADMIN PAGE] Post Devotee Sucess',
    POST_DEVOTEE_FAIL_ACTION = '[ADMIN PAGE] Post Devotee Fail',

    UPDATE_DEVOTEE_ACTION = '[ADMIN PAGE] Update Devotee',
    UPDATE_DEVOTEE_SUCESS_ACTION = '[ADMIN PAGE] Update Devotee Sucess',
    UPDATE_DEVOTEE_FAIL_ACTION = '[ADMIN PAGE] Update Devotee Fail',

    DELETE_DEVOTEE_ACTION = '[ADMIN PAGE] Delete Devotee',
    DELETE_DEVOTEE_SUCESS_ACTION = '[ADMIN PAGE] Delete Devotee Sucess',
    DELETE_DEVOTEE_FAIL_ACTION = '[ADMIN PAGE] Delete Devotee Fail',

    GET_DEVOTEE_BY_ID_ACTION = '[ADMIN PAGE] Get Devotee by ID',
    GET_DEVOTEE_BY_ID_SUCESS_ACTION = '[ADMIN PAGE] Get Devotee by ID Sucess',
    GET_DEVOTEE_BY_ID_FAIL_ACTION = '[ADMIN PAGE] Get Devotee by ID Fail',

    GET_DONATION_LIST_ACTION = '[ADMIN PAGE] Get Donation List',
    GET_DONATION_LIST_SUCESS_ACTION = '[ADMIN PAGE] Get Donation List Sucess',
    GET_DONATION_LIST_FAIL_ACTION = '[ADMIN PAGE] Get Donation List Fail',

    GET_DONATION_LIST_DESC_ACTION = '[ADMIN PAGE] Get Donation List DESC',
    GET_DONATION_LIST_DESC_SUCESS_ACTION = '[ADMIN PAGE] Get Donation List Sucess DESC',
    GET_DONATION_LIST_DESC_FAIL_ACTION = '[ADMIN PAGE] Get Donation List Fail DESC'
  
}
//get actcions
export const GetDevoteesAction = createAction(AdminActions.GET_DEVOTEES_ACTION);

export const GetDevoteesSuccessAction = createAction(AdminActions.GET_DEVOTEES_SUCESS_ACTION,props<{DevoteeList : DevoteePostModel[]}>());

export const GetDevoteesFailAction = createAction(AdminActions.GET_DEVOTEES_FAIL_ACTION,props<{error : string}>());

//get DEVOTEE list desc action 
export const GetDevoteesDescAction = createAction(AdminActions.GET_DEVOTEES_DESC);

export const GetDevoteesDescSucessAction = createAction(AdminActions.GET_DEVOTEES_DESC_SUCESS,props<{DevoteeList : Array<DevoteePostModel>}>());

export const GetDevoteesDescFailAction = createAction(AdminActions.GET_DEVOTEES_DESC_FAIL,props<{error : string}>());


// post actions
export const PostDevoteeAction = createAction(AdminActions.POST_DEVOTEE_ACTION,props<{Devotee : DevoteePostModel}>());

export const PostDevoteeSucessAction = createAction(AdminActions.POST_DEVOTEE_SUCESS_ACTION,props<{Devotee : DevoteePostModel}>());

export const PostDevoteeFailAction = createAction(AdminActions.POST_DEVOTEE_FAIL_ACTION,props<{error : string}>());

//update actions
export const UpdateDevoteeAction = createAction(AdminActions.UPDATE_DEVOTEE_ACTION,props<{Devotee : DevoteePostModel,Id : number}>());

export const UpdateDevoteeSucessAction = createAction(AdminActions.UPDATE_DEVOTEE_SUCESS_ACTION,props<{Devotee : DevoteePostModel}>());

export const UpdateDevoteeFailAction = createAction(AdminActions.UPDATE_DEVOTEE_FAIL_ACTION,props<{error : string}>());

//Get Devotee By Id 
export const GetDevoteeByIDAction = createAction(AdminActions.GET_DEVOTEE_BY_ID_ACTION,props<{Id:number}>());

export const GetDevoteeByIDSucessAction = createAction(AdminActions.GET_DEVOTEE_BY_ID_ACTION,props<{Id:number}>());

export const GetDevoteeByIDFailsAction = createAction(AdminActions.GET_DEVOTEE_BY_ID_ACTION,props<{error:string}>());

///Get Donations 

export const GetDonationListAction = createAction(AdminActions.GET_DONATION_LIST_ACTION);

export const GetDonationListSuccessAction = createAction(AdminActions.GET_DONATION_LIST_ACTION,props<{Donation : DonationModel []}>());

export const GetDonationListFailsAction = createAction(AdminActions.GET_DONATION_LIST_FAIL_ACTION,props<{error:string}>());

//get Donation desc

export const GetDonationListDESCAction = createAction(
    AdminActions.GET_DONATION_LIST_DESC_ACTION
);

export const GetDonationListDESCSuccessAction = createAction(
    AdminActions.GET_DONATION_LIST_DESC_SUCESS_ACTION,props<{Donations : Array<DonationModel>}>()
);

export const GetDonationListDescFailAction = createAction(
    AdminActions.GET_DONATION_LIST_DESC_FAIL_ACTION,props<{error:string}>()
)


//delete Devotee actions

export const DeleteDevoteeAction = createAction(AdminActions.DELETE_DEVOTEE_ACTION,props<{Id : number}>());

export const DeleteDevoteeSucessAction = createAction(AdminActions.DELETE_DEVOTEE_SUCESS_ACTION,props<{Id:number}>());

export const DeleteDevoteeFailAction = createAction(AdminActions.DELETE_DEVOTEE_FAIL_ACTION,props<{error : string}>())

