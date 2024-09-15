import { ItemBase } from "./ItemBase.classs";

export class Date extends ItemBase<string>{
    override controltype: string = "date";
    override value: string = ''; 
}