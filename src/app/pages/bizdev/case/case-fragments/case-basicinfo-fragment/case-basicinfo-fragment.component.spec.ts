import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseBasicinfoFragmentComponent } from './case-basicinfo-fragment.component';

describe('CaseBasicinfoFragmentComponent', () => {
  let component: CaseBasicinfoFragmentComponent;
  let fixture: ComponentFixture<CaseBasicinfoFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseBasicinfoFragmentComponent]
    });
    fixture = TestBed.createComponent(CaseBasicinfoFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
