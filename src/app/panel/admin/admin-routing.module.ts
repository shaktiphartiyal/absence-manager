import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { LeaveApprovalDetailsComponent } from './leave-approval/leave-approval-details/leave-approval-details.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'leave-approval',
        pathMatch: 'full'
      },
      {
        path: 'leave-approval',
        component: LeaveApprovalComponent,
        data: {
          name: 'admin-leave-approval',
          parentName: 'admin'
        }
      },
      {
        path: 'leave-approval/details/{id}',
        component: LeaveApprovalDetailsComponent,
        data: {
          name: 'admin-leave-details',
          parentName: 'admin'
        }
      },
      {
        path: 'team-management',
        component: TeamManagementComponent,
        data: {
          name: 'admin-team-management',
          parentName: 'admin'
        }
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
        data: {
          name: 'admin-user-management',
          parentName: 'admin'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
