import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { StoreModule } from '@ngrx/store';
import { ADMIN_STATE_NAME } from '../../States/Admin/admin.selector';
import { AdminReducer } from '../../States/Admin/admin.reducer';
import { AdminModule } from './admin.module';
import { EffectsModule } from '@ngrx/effects';


describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports : [
        StoreModule.forRoot({}),AdminModule,EffectsModule.forRoot([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
});
