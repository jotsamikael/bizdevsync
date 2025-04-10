import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSupportInquiryComponent } from './help-support-inquiry.component';

describe('HelpSupportInquiryComponent', () => {
  let component: HelpSupportInquiryComponent;
  let fixture: ComponentFixture<HelpSupportInquiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpSupportInquiryComponent]
    });
    fixture = TestBed.createComponent(HelpSupportInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
