import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkNotesComponent } from './park-notes.component';

describe('ParkNotes1Component', () => {
  let component: ParkNotesComponent;
  let fixture: ComponentFixture<ParkNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
