import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeNoteComponent } from './liste-note.component';

describe('ListeNoteComponent', () => {
  let component: ListeNoteComponent;
  let fixture: ComponentFixture<ListeNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
