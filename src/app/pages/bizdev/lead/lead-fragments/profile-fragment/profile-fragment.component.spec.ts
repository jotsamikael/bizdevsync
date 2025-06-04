import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFragmentComponent } from './profile-fragment.component';

describe('ProfileFragmentComponent', () => {
  let component: ProfileFragmentComponent;
  let fixture: ComponentFixture<ProfileFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFragmentComponent]
    });
    fixture = TestBed.createComponent(ProfileFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
