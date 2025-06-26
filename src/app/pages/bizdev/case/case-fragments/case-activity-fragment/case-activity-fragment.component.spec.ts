import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseActivityFragmentComponent } from './case-activity-fragment.component';

describe('CaseActivityFragmentComponent', () => {
  let component: CaseActivityFragmentComponent;
  let fixture: ComponentFixture<CaseActivityFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseActivityFragmentComponent]
    });
    fixture = TestBed.createComponent(CaseActivityFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
