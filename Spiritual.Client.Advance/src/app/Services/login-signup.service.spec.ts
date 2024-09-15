import { TestBed } from '@angular/core/testing';

import { LoginSignupService } from './login-signup.service';
import { LoginComponent } from '../Modules/shared/login/login.component';
import { AppModule } from '../app.module';

describe('LoginSignupService', () => {
  let service: LoginSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AppModule],
     providers:[LoginSignupService],
     declarations:[LoginComponent]
    });
    service = TestBed.inject(LoginSignupService);
  });

  it('Login service should be created', () => {
    expect(service).toBeTruthy();
  });
});
