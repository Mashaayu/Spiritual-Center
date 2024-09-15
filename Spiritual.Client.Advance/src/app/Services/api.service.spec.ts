import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { LoginComponent } from '../Modules/shared/login/login.component';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
