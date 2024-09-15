import { createFeatureSelector, createSelector } from "@ngrx/store"
import { DevoteeState } from "./devotee.state";

export const DEVOTEE_STATE_NAME = "DevoteeState"

const getDevoteeState = createFeatureSelector<DevoteeState>(DEVOTEE_STATE_NAME);



export const GetDevoteeDataSelector = createSelector(
    getDevoteeState,(state)=>{
        return state.DevoteeData;
    }
);

export const GetMyPaymentListSelector = createSelector(
    getDevoteeState,(state)=>{
        return state.DevoteePayments;
    }
);

export const GetDevoteeState = createSelector(
    getDevoteeState,(state)=>{
        return state;
    }
)