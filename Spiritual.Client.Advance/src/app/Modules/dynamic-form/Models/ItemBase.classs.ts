import { Validators } from "@angular/forms";

export class ItemBase <T> {
    value : T | undefined;
    key : string;
    id:string;
    label :string;
    ErrorId:string;
    order:number;
    controltype: string;
    validators : {
        validator  : string, value : any, error: string,message:string
    }[]
   
    // validators:
    //    {
    //     required : {
    //         flag : boolean ,value : boolean
    //     },
    //     minLength: {
    //         flag : boolean , value: number
    //     },
    //     maxLength : {
    //         flag : boolean, value : number
    //     } ,
    //     pattern : {
    //         flag : boolean ,value : RegExp
    //     },
    //     dateTwoMonthsLessFromTodayValidator? : {
    //         flag : boolean , value : boolean
    //     },
    //    }
    

    constructor(opts : {
        value?: T,
        key? : string,
        label? :string,
        order?:number,
        id?:string;
        controltype?: string,
        ErrorId?:string,

        validators?: {
            validator  : string, value   : any, error : string,message :string
        }[]
    }={})
    
    {
        this.value = opts.value;
        this.key = opts.key || '';
        this.label = opts.label || '';
        this.id = opts.id || "";
        this.order = opts.order === undefined ? 1 : opts.order;
        this.ErrorId = opts.ErrorId || '';
        this.controltype = opts.controltype || '';

        
        this.validators = opts.validators || [];
    }
    


}
