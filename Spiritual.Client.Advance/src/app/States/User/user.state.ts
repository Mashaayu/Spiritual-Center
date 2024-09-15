import { User, UserIDs } from "../../Model/User.Model";

export interface UserState  {
    User : User | null,
    Error : string,
    ActiveUsers : UserIDs[],
} 

export const initalState : UserState  = {
    User : null,
    Error: '',
    ActiveUsers : []
}