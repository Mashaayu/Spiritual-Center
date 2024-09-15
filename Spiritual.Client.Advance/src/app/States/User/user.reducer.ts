import { Action, createReducer, on } from "@ngrx/store";
import { UserState, initalState } from "./user.state";
import { ClearUserState, GetActiveUsers, GetActiveUsersFail, GetActiveUsersSucess, LoginUserAction, LoginUserFail, LoginUserSuccess } from "./user.action";


export function UserReducer(state:UserState,action :Action<string>){
    return _UserReducer(state,action);
}


const _UserReducer = createReducer(initalState,
    on(LoginUserAction,(state)=>{
        return {
            ...state,
           
        }
    }),
    on(LoginUserSuccess,(state,action)=>{
            
        return {
            ...state,
            User : action.User,
            Error : ''
        }
    }),
    on(LoginUserFail,(state,action)=>
        {
            return {
                ...state,
                Error : action.error
            }
        }
    ),
    on(ClearUserState,(state)=>{
         
        return {
            ...state,
            User : null,
            Error : ''
        }
    }),
    on(GetActiveUsers,(state)=>{
        return {
            ...state,
            ActiveUsers : state.ActiveUsers
        }  
    }),
    on(GetActiveUsersSucess,(state,action)=>{
        return {
            ...state,
            ActiveUsers : action.Users,
            Error : ''
        }  
    }), 
    on(GetActiveUsersFail,(state,action)=>{
        return {
            ...state,
           Error : action.Error
        }  
    }),
);