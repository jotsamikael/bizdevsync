import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFragmentComponent } from './activity-fragment.component';

describe('ActivityFragmentComponent', () => {
  let component: ActivityFragmentComponent;
  let fixture: ComponentFixture<ActivityFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityFragmentComponent]
    });
    fixture = TestBed.createComponent(ActivityFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
