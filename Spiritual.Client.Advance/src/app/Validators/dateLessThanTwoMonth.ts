import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateTwoMonthsLessFromTodayValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // return null if there's no value
    }
 
    const today :Date = new Date();
    const DateFromToday = new Date(new Date().setMonth(today.getMonth() -  2));
    
    const inputDate = new Date(control.value);

    const isFutureDate: boolean = today > inputDate;

    if(inputDate < DateFromToday || !isFutureDate){
      return  { 'dateisInvalid': control.value } 
    }
 
    else{
      return  null
    }
   
  };
}


// export function dateLessThanTwoMonthValidator(): ValidatorFn {
 
//   return (control: AbstractControl): ValidationErrors | null => {
    
//     const passedDate: string = control.value;
//     if (!isNaN(parseInt(passedDate))) {
//       const parsedDate: Date = new Date(passedDate);

//       if (
//         parsedDate.getTime() >
//         new Date().setMonth(parsedDate.getMonth() - 2)
//       )
//         return null;
//     }

//     return { dateLessThanTwoMonth: { value: control.value } };
//   };
// }
