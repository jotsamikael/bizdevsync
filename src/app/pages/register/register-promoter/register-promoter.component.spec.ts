import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPromoterComponent } from './register-promoter.component';

describe('RegisterPromoterComponent', () => {
  let component: RegisterPromoterComponent;
  let fixture: ComponentFixture<RegisterPromoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPromoterComponent]
    });
    fixture = TestBed.createComponent(RegisterPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
