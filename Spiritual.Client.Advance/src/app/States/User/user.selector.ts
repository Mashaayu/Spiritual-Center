import { createFeatureSelector, createSelector } from "@ngrx/store"
import { UserState } from "./user.state";

export const USER_STATE_NAME = 'userState'

const GetUserState = createFeatureSelector<UserState>(USER_STATE_NAME); 

export const getUser = createSelector(GetUserState,(state)=>{
    return state.User;
})

export const getuserstate = createSelector(GetUserState,(state)=>{
    return state;
});

export const Getactiveusers = createSelector(GetUserState,(state)=>{
    return state.ActiveUsers;
});