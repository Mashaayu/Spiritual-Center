import { TestBed } from '@angular/core/testing';

import { ItemContolService } from './item-contol.service';

describe('ItemContolService', () => {
  let service: ItemContolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemContolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
