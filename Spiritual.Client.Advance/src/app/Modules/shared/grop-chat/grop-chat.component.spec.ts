import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GropChatComponent } from './grop-chat.component';

describe('GropChatComponent', () => {
  let component: GropChatComponent;
  let fixture: ComponentFixture<GropChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GropChatComponent]
    })
    
    .compileComponents();

    fixture = TestBed.createComponent(GropChatComponent);
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
