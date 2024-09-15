import { Action, createReducer, on } from "@ngrx/store";
import { AdminState, initialState } from "./admin.state";
import { DeleteDevoteeAction, DeleteDevoteeFailAction, DeleteDevoteeSucessAction, GetDevoteesAction, GetDevoteesDescAction, GetDevoteesDescFailAction, GetDevoteesDescSucessAction, GetDevoteesFailAction, GetDevoteesSuccessAction, GetDonationListAction, GetDonationListDESCAction, GetDonationListDESCSuccessAction, GetDonationListDescFailAction, GetDonationListFailsAction, GetDonationListSuccessAction, PostDevoteeAction, PostDevoteeFailAction, PostDevoteeSucessAction, UpdateDevoteeAction, UpdateDevoteeFailAction, UpdateDevoteeSucessAction } from "./admin.actions";



export function AdminReducer(state:AdminState,action : Action){
    return _AdminReducer(state,action);
}
const _AdminReducer = createReducer(initialState,on(
    GetDevoteesAction,(state)=>{
       
        return {
            ...state,
            // DevoteeList:[
            //     ...state.DevoteeList
            // ],
            Error : ''
       }
        
    }),
    on(GetDevoteesSuccessAction,(state,action)=>{
       
        return {
            ...state,
            DevoteeList: action.DevoteeList,
            Error: ''
        }
    }),

    on(GetDevoteesFailAction,(state,action)=>{
        return {
            ...state,
            Error : action.error
        }
    }),

    on(GetDevoteesDescAction,(state)=>{
        return state;
    }),
    on(GetDevoteesDescSucessAction,(state,action)=>{
        return {
            ...state,
            DevoteeList : action.DevoteeList,
            Error : ''
        }
    }),
    on(GetDevoteesDescFailAction,(state,action)=>{
        return {
            ...state,
            Error : action.error
        }
    }),
    on(PostDevoteeAction,(state,action)=>{
        return {
            ...state,
            DevoteeList : [
                ...state.DevoteeList,
                action.Devotee,
                
            ],
            Error : ''
        }
    }),
    on(PostDevoteeSucessAction,(state,action)=>{
        return {
            ...state,
            DevoteeList : [
                ...state.DevoteeList,
                action.Devotee
            ],
            Error : ''
        }
    }),
    on(PostDevoteeFailAction,(state,action)=>{
        return {
            ...state,
            Error : action.error
        }
    }),
    on(UpdateDevoteeAction,(state,action)=>{
        let UpdatedDevotees = state.DevoteeList.map((devotee)=>
            {
                return action.Devotee.id ==  action.Id ?
                action.Devotee : devotee
            }
        );
        return {
            ...state,
            DevoteeList : UpdatedDevotees,
            Error:''
        }

    }),
    on(UpdateDevoteeSucessAction,(state,action)=>{
        let UpdatedDevotees = state.DevoteeList.map((devotee)=>
            {
                return action.Devotee.id ==  action.Devotee.id ?
                action.Devotee : devotee
            }
        );
        return {
            ...state,
            DevoteeList : UpdatedDevotees,
            Error:''
        }

    }),
    on(UpdateDevoteeFailAction,(state,action)=>{
        
        return {
            ...state,
            Error: action.error
        }

    }),

    on(DeleteDevoteeAction,(state,action)=>{
        let UpdatedDevotees = state.DevoteeList.filter((devotee)=>{
            return devotee.id != action.Id 
        });

        return {
            ...state,
            DevoteeList: UpdatedDevotees,
            Error:''
        }
    }),

    on(DeleteDevoteeSucessAction,(state,action)=>{
        let UpdatedDevotees = state.DevoteeList.filter((devotee)=>{
            return devotee.id ! = action.Id 
        });

        return {
            ...state,
            DevoteeList: UpdatedDevotees,
            Error:''
        }
    }),

    on(DeleteDevoteeFailAction,(state,action)=>{
    
        return {
            ...state,
           Error : action.error
        }
    }),

    on(GetDonationListAction,(state)=>{
        return {
            ...state,
            DonationList : state.DonationList,
            Error : ''
        }
    }),
    on(GetDonationListSuccessAction,(state,action)=>{
        return {
            ...state,
            DonationList :  action.Donation,
            Error : ''
        }
    }),
    on(GetDonationListFailsAction,(state,action)=>{
        return {
            ...state,
            Error : action.error
        }
    }),

    on(GetDonationListDESCAction,(state)=>{
        return {
            ...state,
            DonationList : state.DonationList,
            Error : ''
        }
    }),
    on(GetDonationListDESCSuccessAction,(state,action)=>{
        return {
            ...state,
            DonationList :  action.Donations,
            Error : ''
        }
    }),
    on(GetDonationListDescFailAction,(state,action)=>{
        return {
            ...state,
            Error : action.error
        }
    }),

) //inital Admin state