import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDetailComponent } from './case-detail.component';

describe('CaseDetailComponent', () => {
  let component: CaseDetailComponent;
  let fixture: ComponentFixture<CaseDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseDetailComponent]
    });
    fixture = TestBed.createComponent(CaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
