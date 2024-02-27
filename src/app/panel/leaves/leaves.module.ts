import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../_core';
import { FormsModule } from '@angular/forms';
import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './leaves.component';
import { ManageLeavesComponent } from './manage-leaves/manage-leaves.component';
import { AvailableLeavesComponent } from './available-leaves/available-leaves.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TeamCalendarComponent } from './team-calendar/team-calendar.component';

@NgModule({
  declarations: [
    LeavesComponent,
    ManageLeavesComponent,
    AvailableLeavesComponent,
    CalendarComponent,
    TeamCalendarComponent,
  ],
  imports: [
    CommonModule,
    CoreModule.forRoot(),
    LeavesRoutingModule,
    FormsModule
  ]
})
export class LeavesModule { }
