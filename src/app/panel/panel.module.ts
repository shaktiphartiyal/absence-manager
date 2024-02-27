import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LeftSidebarComponent } from './layout/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { CoreModule } from '../_core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    PanelComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule.forRoot(),
    PanelRoutingModule,
    FormsModule
  ]
})
export class PanelModule { }
