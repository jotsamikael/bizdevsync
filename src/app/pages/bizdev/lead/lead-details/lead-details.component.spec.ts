import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDetailsComponent } from './lead-details.component';

describe('LeadDetailsComponent', () => {
  let component: LeadDetailsComponent;
  let fixture: ComponentFixture<LeadDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadDetailsComponent]
    });
    fixture = TestBed.createComponent(LeadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
