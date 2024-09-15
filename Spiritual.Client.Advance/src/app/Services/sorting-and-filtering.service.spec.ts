import { TestBed } from '@angular/core/testing';

import { SortingAndFilteringService } from './sorting-and-filtering.service';

describe('SortingAndFilteringService', () => {
  let service: SortingAndFilteringService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[SortingAndFilteringService]
    });
    service = TestBed.inject(SortingAndFilteringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
