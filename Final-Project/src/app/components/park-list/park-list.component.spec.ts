import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkListComponent } from './park-list.component';

describe('ParkListComponent', () => {
  let component: ParkListComponent;
  let fixture: ComponentFixture<ParkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
