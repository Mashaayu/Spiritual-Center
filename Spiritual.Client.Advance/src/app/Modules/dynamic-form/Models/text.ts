import { ItemBase } from "./ItemBase.classs";

export class Text extends ItemBase<string> {
     override controltype: string = "text";
     override value: string  = "";
}