import { ItemBase } from "./ItemBase.classs";

export class Number extends ItemBase<number>{
    override controltype: string = "number"; 
    override value = 0;
}