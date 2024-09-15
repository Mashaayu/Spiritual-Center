export interface User{
    userName:string,
    token:string
    role : string
}

export interface UserIDs {
    id :string,
    name  :string,
}

export interface GroupMessage{
    sender  :string,
    senderID : string
    message : string,
    time : Date
}
export interface GroupMessageModel{
    groupName : string,
    messages : GroupMessage[]
}

export interface AddtoGropModel{
    gropName : string,
    members : string[]
}