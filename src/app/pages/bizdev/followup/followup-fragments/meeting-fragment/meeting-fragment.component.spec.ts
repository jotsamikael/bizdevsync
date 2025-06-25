import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingFragmentComponent } from './meeting-fragment.component';

describe('MeetingFragmentComponent', () => {
  let component: MeetingFragmentComponent;
  let fixture: ComponentFixture<MeetingFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingFragmentComponent]
    });
    fixture = TestBed.createComponent(MeetingFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
