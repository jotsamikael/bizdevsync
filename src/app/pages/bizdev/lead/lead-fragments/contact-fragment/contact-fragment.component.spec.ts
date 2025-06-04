import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFragmentComponent } from './contact-fragment.component';

describe('ContactFragmentComponent', () => {
  let component: ContactFragmentComponent;
  let fixture: ComponentFixture<ContactFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactFragmentComponent]
    });
    fixture = TestBed.createComponent(ContactFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
