import { TestBed } from '@angular/core/testing';

import { DevoteeapiService } from './devoteeapi.service';
import { LoginComponent } from '../Modules/shared/login/login.component';

describe('DevoteeapiService', () => {
  let service: DevoteeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[LoginComponent],
      providers:[DevoteeapiService]
    });
    service = TestBed.inject(DevoteeapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
