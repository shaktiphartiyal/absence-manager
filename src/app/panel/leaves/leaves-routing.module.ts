import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavesComponent } from './leaves.component';
import { ManageLeavesComponent } from './manage-leaves/manage-leaves.component';
import { AvailableLeavesComponent } from './available-leaves/available-leaves.component';
import { TeamCalendarComponent } from './team-calendar/team-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: LeavesComponent,
    children: [
      {
        path: '',
        redirectTo: 'manage-leaves',
        pathMatch: 'full'
      },
      // {
      //   path: 'available-leaves',
      //   component: AvailableLeavesComponent
      // },
      {
        path: 'manage-leaves',
        component: ManageLeavesComponent,
        data: {
          name: 'manage-leaves'
        }
      },
      {
        path: 'team-calendar',
        component: TeamCalendarComponent,
        data: {
          name: 'team-calendar'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }
