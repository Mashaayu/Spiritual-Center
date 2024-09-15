import { Component, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Subject } from "rxjs";

@Component({
    selector: 'filter-root',
    templateUrl: './filter.component.html',
    styleUrl:'./filter.component.css'
})

export class FilterComponent{

    @Output() OrderbyASC$ : Subject<void> = new Subject();
    @Output() OrderbyDesc$: Subject<void> = new Subject();
    
    @Output() OnSearch$ : Subject<string> = new Subject();
    
OrderByDesc() {
    this.OrderbyDesc$.next();
}
Onsearch() {
    this.OnSearch$.next(this.inputSearch);
}

OrderByAsc() {
    this.OrderbyASC$.next();
}
    inputSearch:string = '';
}
