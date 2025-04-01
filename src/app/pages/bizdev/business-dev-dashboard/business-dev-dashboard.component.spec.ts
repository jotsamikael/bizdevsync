import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDevDashboardComponent } from './business-dev-dashboard.component';

describe('BusinessDevDashboardComponent', () => {
  let component: BusinessDevDashboardComponent;
  let fixture: ComponentFixture<BusinessDevDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessDevDashboardComponent]
    });
    fixture = TestBed.createComponent(BusinessDevDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
