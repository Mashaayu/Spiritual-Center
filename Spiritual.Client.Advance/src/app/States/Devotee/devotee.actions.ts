import { createAction, props } from "@ngrx/store";
import { DevoteePostModel } from "../../Model/Devotee.Model";
import { Donation, DonationModel } from "../../Model/Donation.Model";


export enum DevoteeActions{

    GET_DEVOTEE_DATA_ACTION = '[DEVOTEE PAGE] Get Devotee Data',
    GET_DEVOTEE_DATA_SUCESS_ACTION = '[DEVOTEE PAGE] Get Devotee Data Sucess',
    GET_DEVOTEE_DATA_FAIL_ACTION  = '[DEVOTEE PAGE] Get Devotee Data Fail',

    GET_PAYMENT_LIST_ACTION = '[DEVOTEE PAGE] Get Payments List',
    GET_PAYMENT_LIST_SUCESS_ACTION = '[DEVOTEE PAGE] Get Payments List Sucess',
    GET_PAYMENT_LIST_FAIL_ACTION = '[DEVOTEE PAGE] Get Payments List Fail',
    
    MAKE_PAYMENT_ACTION = '[DEVOTEE PAGE] Make Payment Action',
    MAKE_PAYMENT_SUCESS_ACTION = '[DEVOTEE PAGE] Make Payment Action',
    MAKE_PAYMENT_FAIL_ACTION = '[DEVOTEE PAGE] Make Payment Action',
}

// Devotee data Actions 
export const GetDevoteeDataAction = createAction(DevoteeActions.GET_DEVOTEE_DATA_ACTION,props<{username: string}>());

export const GetDevoteeDataSuccessAction = createAction(DevoteeActions.GET_DEVOTEE_DATA_SUCESS_ACTION,props<{DevoteeData : DevoteePostModel}>());

export const GetDevoteeDataFailAction = createAction(DevoteeActions.GET_DEVOTEE_DATA_FAIL_ACTION,props<{error:string}>());


//get payment list action 

export const GetPaymentListAction = createAction(DevoteeActions.GET_PAYMENT_LIST_ACTION,props<{devoteeId : number}>());

export const GetPaymentListSuccessAction = createAction(DevoteeActions.GET_PAYMENT_LIST_SUCESS_ACTION,props<{DonationList : DonationModel[]}>());

export const GetPaymentListFailAction = createAction(DevoteeActions.GET_PAYMENT_LIST_FAIL_ACTION,props<{error:string}>());

//payment actions

export const MakePaymentAcion = createAction(DevoteeActions.MAKE_PAYMENT_ACTION,props<{
    Donation : Donation
}>());

export const MakePaymentSucessAcion = createAction(DevoteeActions.MAKE_PAYMENT_SUCESS_ACTION,props<{Donation:Donation}>());

export const MakePaymentFailAcion = createAction(DevoteeActions.MAKE_PAYMENT_FAIL_ACTION,props<{Error : string}>());