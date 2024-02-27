import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { AdminGuard } from '../guards/admin.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'leaves',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'leaves',
        loadChildren: () => import('./leaves/leaves.module').then(m => m.LeavesModule)
      },
      {
        path: 'admin',
        data: {
          name: 'admin'
        },
        canActivate: [AdminGuard],
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
