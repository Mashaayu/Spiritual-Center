import { Action, createReducer, on } from "@ngrx/store";
import { DevoteeState, initialState } from "./devotee.state";
import { GetDevoteeDataAction,GetDevoteeDataFailAction,GetDevoteeDataSuccessAction,
    GetPaymentListAction, GetPaymentListFailAction, GetPaymentListSuccessAction } from "./devotee.actions";


export function DevoteeReducer(state:DevoteeState,action:Action){
    return _DevoteeReducer(state,action)
}

const _DevoteeReducer = createReducer(initialState,on(
        GetDevoteeDataAction,(state)=>{
            return {
                ...state,
                DevoteeData : state.DevoteeData,
                Error : ''
            }
        }
),
on(
    GetDevoteeDataSuccessAction,(state,action)=>{
        return {
            ...state,
            DevoteeData : action.DevoteeData,
            Error : ''
        }
    }
),
on(
    GetDevoteeDataFailAction,(state,action) =>{
        return {
            ...state,
            Error : action.error
        }
    }
),
on(GetPaymentListAction,(state)=>{
    return {
        ...state,
        DevoteePayments : state.DevoteePayments,
        Error : ''
    }   
}),
on(
    GetPaymentListSuccessAction,(state,action)=>{
        return {
            ...state,
            DevoteePayments : action.DonationList,
            Error : ''
        }
    }
),
on(GetPaymentListFailAction,(state,action)=>{
    return {
        ...state,
        Error :action.error
    }
}),


);