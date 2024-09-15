import { AdminReducer } from "./Admin/admin.reducer";
import { AdminState } from "./Admin/admin.state";
import { DevoteeReducer } from "./Devotee/devotee.reducers";
import { DevoteeState } from "./Devotee/devotee.state";
import { UserReducer } from "./User/user.reducer";
import { UserState } from "./User/user.state";

export interface AppState {
    devoteeState : DevoteeState,
    donationState : AdminState,
    userState : UserState
}

export const appReducer = {
    devotee: DevoteeReducer,
    donation : AdminReducer,
    User : UserReducer
}