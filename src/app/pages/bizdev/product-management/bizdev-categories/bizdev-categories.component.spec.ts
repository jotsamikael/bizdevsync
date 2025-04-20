import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizdevCategoriesComponent } from './bizdev-categories.component';

describe('BizdevCategoriesComponent', () => {
  let component: BizdevCategoriesComponent;
  let fixture: ComponentFixture<BizdevCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizdevCategoriesComponent]
    });
    fixture = TestBed.createComponent(BizdevCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
