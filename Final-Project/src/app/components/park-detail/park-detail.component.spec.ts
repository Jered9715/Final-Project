import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkDetailComponent } from './park-detail.component';

describe('ParkDetailComponent', () => {
  let component: ParkDetailComponent;
  let fixture: ComponentFixture<ParkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
