import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableLeavesComponent } from './available-leaves.component';

describe('AvailableLeavesComponent', () => {
  let component: AvailableLeavesComponent;
  let fixture: ComponentFixture<AvailableLeavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableLeavesComponent]
    });
    fixture = TestBed.createComponent(AvailableLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
