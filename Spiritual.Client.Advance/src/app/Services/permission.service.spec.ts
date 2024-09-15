import { TestBed } from '@angular/core/testing';

import { PermissionService } from './permission.service';
import { HttpClientModule } from '@angular/common/http';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[PermissionService]
    });
    service = TestBed.inject(PermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
