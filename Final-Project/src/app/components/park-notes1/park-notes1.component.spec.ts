import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkNotes1Component } from './park-notes1.component';

describe('ParkNotes1Component', () => {
  let component: ParkNotes1Component;
  let fixture: ComponentFixture<ParkNotes1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkNotes1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkNotes1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
