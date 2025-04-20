import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizdevProductsComponent } from './bizdev-products.component';

describe('BizdevProductsComponent', () => {
  let component: BizdevProductsComponent;
  let fixture: ComponentFixture<BizdevProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BizdevProductsComponent]
    });
    fixture = TestBed.createComponent(BizdevProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
