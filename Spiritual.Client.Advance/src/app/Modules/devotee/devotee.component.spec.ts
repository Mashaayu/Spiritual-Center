import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevoteeComponent } from './devotee.component';
import { DonationApiService } from '../../Services/donation-api.service';

describe('DevoteeComponent', () => {
  let component: DevoteeComponent;
  let fixture: ComponentFixture<DevoteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevoteeComponent],
      providers:[DonationApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevoteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
    fixture.destroy();
  });
});
