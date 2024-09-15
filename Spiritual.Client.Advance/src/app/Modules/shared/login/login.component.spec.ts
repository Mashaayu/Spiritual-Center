import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiService } from '../../../Services/api.service';
import { LoginSignupService } from '../../../Services/login-signup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement : DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
     
      providers: [
         
      ],
       imports:[HttpClientModule,ReactiveFormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        LoginComponent
       ],
       declarations:[],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('username required error',()=>{
    
    let userNameinput  = fixture.nativeElement.querySelector

    let userNameError:HTMLDivElement = fixture.nativeElement.querySelector('#usernameErr');


    expect(userNameError.innerText).toContain('Username is required');


  })


  afterEach(() => {
    fixture.destroy();
  });


});

