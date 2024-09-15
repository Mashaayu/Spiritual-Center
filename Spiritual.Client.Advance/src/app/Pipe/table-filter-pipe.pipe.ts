import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterPipe'
})
export class TableFilterPipePipe implements PipeTransform {

  transform(value: any[], searchText: string, prop?: any): any {  
    if (!value) {  
      return [];  
    }  
    if (!searchText || !prop) {  
      return value;  
    }  
    const input = searchText.toLowerCase(),  
      IsArray = Array.isArray(value),  
      flag = IsArray && typeof value[0] === 'object' ? true :
       IsArray && typeof value[0] !== 'object' ? false : true;  
  
    return value.filter(ele => {  
      let val = flag ? ele[prop] : ele;  
      return val.toString().toLowerCase().includes(input);  
    });  
  
  }  
}
