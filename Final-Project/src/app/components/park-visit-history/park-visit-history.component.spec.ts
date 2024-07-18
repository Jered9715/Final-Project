import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkVisitHistoryComponent } from './park-visit-history.component';

describe('ParkVisitHistoryComponent', () => {
  let component: ParkVisitHistoryComponent;
  let fixture: ComponentFixture<ParkVisitHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkVisitHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkVisitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
