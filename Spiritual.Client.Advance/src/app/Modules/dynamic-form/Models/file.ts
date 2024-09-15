import { ItemBase } from "./ItemBase.classs";

export class File extends ItemBase<string> {
    override controltype: string = "file"; 
    override value: string = '';
}