export interface Devotee{
    id:number,
    firstname : string,
    middlename:string,
    lastname:string,
    emaidId:string,
    devoteeLoginId : string,
    initiationDate:string,
    flatno:number,
    area :string,
    city :string,
    state:string,
    pincode:number

}

export interface DevoteePostModel{
    id:number,
    firstname : string,
    middlename:string,
    lastname:string,
    emaidId:string,
    devoteeLoginId : string,
    initiationDate:string,
    flatno:number,
    area :string,
    city :string,
    state:string,
    pincode:number,
    userImageURL:string,
    userImage : File,
    createdByID  :number,
    createdDate : Date,
    updatedDate:Date ,
    updatedById:number
    
}

export interface Image {

}