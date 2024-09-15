import { createAction, props } from "@ngrx/store";
import { User, UserIDs } from "../../Model/User.Model";

const LOGIN_USER = '[Login Page] Login User';
const LIGIN_USER_SUCESS = '[Login Page] Login User Sucess';
const LOGIN_USER_FAIL = '[Login Page] Login User Fail';
const CLEAR_USER_STATE  = '[Login Page] Clear User State';
const ACTIVE_USER_STATE = '[Login Page] Active User State';
const ACTIVE_USER_SUCESS_STATE = '[Login Page] Active User Sucess State';
const ACTIVE_USER_FAIL_STATE = '[Login Page] Active User Fail State';

export const LoginUserAction = createAction(LOGIN_USER,props<{userName:string}>());

export const LoginUserSuccess = createAction(LIGIN_USER_SUCESS,props<{User : User}>());

export const LoginUserFail = createAction(LOGIN_USER_FAIL,props<{error : string}>());

export const ClearUserState = createAction(CLEAR_USER_STATE);

export const GetActiveUsers = createAction(ACTIVE_USER_STATE);

export const GetActiveUsersSucess = createAction(ACTIVE_USER_SUCESS_STATE,props<{Users : UserIDs[]}>());

export const GetActiveUsersFail = createAction(ACTIVE_USER_FAIL_STATE , props<{Error : string}>());