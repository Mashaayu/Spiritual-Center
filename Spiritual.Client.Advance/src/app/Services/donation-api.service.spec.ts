import { TestBed } from '@angular/core/testing';

import { DonationApiService } from './donation-api.service';
import { LoginComponent } from '../Modules/shared/login/login.component';
import { AdminModule } from '../Modules/admin/admin.module';

describe('DonationApiService', () => {
  let service: DonationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[AdminModule],
      providers:[DonationApiService],
      declarations : [LoginComponent]
    });
    service = TestBed.inject(DonationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
