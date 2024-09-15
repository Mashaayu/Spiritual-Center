
export interface UserMessage{
    sender : string,
    senderID : string,
    receiver : string,
    receiverID : string,
    messages : [
        {
            messageText:string,
            time : Date
        }
    ] | null
    
}

export interface Message {
    sender : string,
    senderID : string,
    receiver : string,
    receiverID : string,
    messageText:string,
    time : Date
    
}