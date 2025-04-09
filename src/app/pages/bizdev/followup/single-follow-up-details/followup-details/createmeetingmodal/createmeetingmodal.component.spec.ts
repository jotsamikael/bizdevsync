import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemeetingmodalComponent } from './createmeetingmodal.component';

describe('CreatemeetingmodalComponent', () => {
  let component: CreatemeetingmodalComponent;
  let fixture: ComponentFixture<CreatemeetingmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatemeetingmodalComponent]
    });
    fixture = TestBed.createComponent(CreatemeetingmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
