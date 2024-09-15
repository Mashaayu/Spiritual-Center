import { Injectable } from '@angular/core';
import { ItemBase } from '../Models/ItemBase.classs';
import { Text } from '../Models/text';
import { of } from 'rxjs/internal/observable/of';
import { Date } from '../Models/date';
import { Number } from '../Models/number';
import { File } from '../Models/file';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getItems(){
    const Items:ItemBase<string | number> [] = [
     
        new Text({
          key : "firstname",
          id:"firstName",
          label : "First Name",
          ErrorId : "firstNameErr",
          order : 1,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "First Name is required",
            },
            {
              validator : 'minLength',value : 3 , error :'minlength',message: "For First Name minimum 3 char required",
            },
            {
              validator : 'maxLength',value : 15 , error :"maxlength", message: "For First Name maximum 15 char allowed",
            },

          ]
        }),

        new Text({
          key : "middlename",
          id:"middleName",
          label : "Middle Name",
          ErrorId : "middleNameErr",
          order : 2,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "Middle Name is required",
            },
            {
              validator : 'minLength',value : 3 , error :'minlength',message: "For Middle Name minimum 3 char required",
            },
            {
              validator : 'maxLength',value : 15 , error :"maxlength", message: "For Middle Name maximum 15 char allowed",
            },

          ]
        }),

        new Text({
          key : "lastname",
          id:"lastName",
          label : "Last Name",
          ErrorId : "lastNameErr",
          order : 3,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "Last Name is required",
            },
            {
              validator : 'minLength',value : 3 , error :'minlength',message: "For Last Name minimum 3 char required",
            },
            {
              validator : 'maxLength',value : 15 , error :"maxlength", message: "For Last Name maximum 15 char allowed",
            },

          ]}),

        new Text({
          key : "emaidId",
          id:"emailIdErr",
          label : "EmailId",
          ErrorId : "EmailId",
          order : 4,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "Email is required",
            },
            {
              validator : 'pattern',value : /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/ , error :'pattern',message: "Pleae enter valid email",
            }
          ]
        }),

        new Date({
          key : "initiationDate",
          id : "initiationDate",
          label : "Initiation Date",
          ErrorId :"initiationDateErr",
          order: 5,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "Initiation Date is required",
            },
            {
              validator : 'dateTwoMonthsLessFromTodayValidator',value : true , error :'dateisInvalid',message: "Initiation Date should be not be less than of last 2 month",
            }
          ]
        }),

        new Number({
          key : "flatno",
          id : "flatNumber",
          label : "Flat Number",
          ErrorId :"flatNumberErr",
          order: 6,
          validators : [
            {
              validator : 'min',value : 1 , error :'min' , message : "Flat Number is required",
            },
            
          ]
        }),
        new Text({
          key : "area",
          id : "area",
          label : "Area",
          ErrorId :"areaErr",
          order: 7,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "Area is required",
            },
          ]
        }),

        new Text({
          key : "city",
          id : "city",
          label : "City",
          ErrorId :"cityErr",
          order: 8,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "City is required",
            },
          ]
        }),

        new Text({
          key : "state",
          id : "state",
          label : "State",
          ErrorId :"stateErr",
          order: 9,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "State is required",
            },
          ]
        }),
        new Text({
          key : "pincode",
          id : "pinCode",
          label : "Pincode",
          ErrorId :"pinCodeErr",
          order: 10,
          validators : [
            {
              validator : 'required',value : true , error :'required' , message : "Pincode is required",
            },
            {
              validator : 'pattern',value : /^[0-9]+$/ , error :'pattern' , message : "Pincode should not contain non digit characters",
            },
            {
              validator : 'maxLength',value : 6 , error :'maxlength' , message : "For Pincode maximum 6 digit allowed",
            },
            {
              validator : 'minLength',value : 6 , error :'minlength' , message : "For Pincode minimum 6 digit allowed",
            },
          ]
        }),

       new File({
        key: "UserImageURL",
        id : "imageUrl",
        label : "Photo",
        order:11,
        ErrorId:"imageUrlErrr"
       }),
    ]
    return of(Items.sort( (a,b)=>a.order - b.order));
  }
}
