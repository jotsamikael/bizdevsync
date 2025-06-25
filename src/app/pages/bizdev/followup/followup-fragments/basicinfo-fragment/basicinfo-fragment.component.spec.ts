import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicinfoFragmentComponent } from './basicinfo-fragment.component';

describe('BasicinfoFragmentComponent', () => {
  let component: BasicinfoFragmentComponent;
  let fixture: ComponentFixture<BasicinfoFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicinfoFragmentComponent]
    });
    fixture = TestBed.createComponent(BasicinfoFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
