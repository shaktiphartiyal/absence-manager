import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApprovalDetailsComponent } from './leave-approval-details.component';

describe('LeaveApprovalDetailsComponent', () => {
  let component: LeaveApprovalDetailsComponent;
  let fixture: ComponentFixture<LeaveApprovalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveApprovalDetailsComponent]
    });
    fixture = TestBed.createComponent(LeaveApprovalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
