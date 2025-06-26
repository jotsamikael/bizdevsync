import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseMeetingFragmentComponent } from './case-meeting-fragment.component';

describe('CaseMeetingFragmentComponent', () => {
  let component: CaseMeetingFragmentComponent;
  let fixture: ComponentFixture<CaseMeetingFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseMeetingFragmentComponent]
    });
    fixture = TestBed.createComponent(CaseMeetingFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
