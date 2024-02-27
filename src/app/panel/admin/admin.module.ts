import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../../_core';
import { FormsModule } from '@angular/forms';
import { UserManagementComponent } from './user-management/user-management.component';
import { LeaveApprovalDetailsComponent } from './leave-approval/leave-approval-details/leave-approval-details.component';


@NgModule({
  declarations: [
    AdminComponent,
    LeaveApprovalComponent,
    TeamManagementComponent,
    UserManagementComponent,
    LeaveApprovalDetailsComponent
  ],
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
