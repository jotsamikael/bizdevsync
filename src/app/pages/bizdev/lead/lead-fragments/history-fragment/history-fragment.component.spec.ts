import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFragmentComponent } from './history-fragment.component';

describe('HistoryFragmentComponent', () => {
  let component: HistoryFragmentComponent;
  let fixture: ComponentFixture<HistoryFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryFragmentComponent]
    });
    fixture = TestBed.createComponent(HistoryFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
