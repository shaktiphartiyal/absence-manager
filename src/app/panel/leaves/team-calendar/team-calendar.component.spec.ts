import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCalendarComponent } from './team-calendar.component';

describe('TeamCalendarComponent', () => {
  let component: TeamCalendarComponent;
  let fixture: ComponentFixture<TeamCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCalendarComponent]
    });
    fixture = TestBed.createComponent(TeamCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
