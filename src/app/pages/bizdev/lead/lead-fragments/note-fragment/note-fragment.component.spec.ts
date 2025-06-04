import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFragmentComponent } from './note-fragment.component';

describe('NoteFragmentComponent', () => {
  let component: NoteFragmentComponent;
  let fixture: ComponentFixture<NoteFragmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteFragmentComponent]
    });
    fixture = TestBed.createComponent(NoteFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
