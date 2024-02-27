import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppGuard } from './guards/app.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  {
    path: '',
    redirectTo: 'panel',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'panel',
    canActivate: [AppGuard],
    loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
