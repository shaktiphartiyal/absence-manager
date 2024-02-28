import { Component, OnInit } from '@angular/core';
import { ApiService, CacheService, PermissionService, ToastService } from 'src/app/_core';

@Component({
  selector: 'app-team-calendar',
  templateUrl: './team-calendar.component.html',
  styleUrls: ['./team-calendar.component.css']
})
export class TeamCalendarComponent implements OnInit {

  private lastSelectedMonth: number | undefined = undefined;
  private lastSelectedTeam: number | undefined = undefined;

  public selectedMonth: number = new Date().getMonth()+1;
  public selectedTeam: number = 0;
  public selectedYear: number = new Date().getFullYear();
  public loading: boolean = false;

  public months: Array<any> = [
    {
      name: 'January',
      value: 1
    },
    {
      name: 'February',
      value: 2
    },
    {
      name: 'March',
      value: 3
    },
    {
      name: 'April',
      value: 4
    },
    {
      name: 'May',
      value: 5
    },
    {
      name: 'June',
      value: 6
    },
    {
      name: 'July',
      value: 7
    },
    {
      name: 'August',
      value: 8
    },
    {
      name: 'September',
      value: 9
    },
    {
      name: 'October',
      value: 10
    },
    {
      name: 'November',
      value: 11
    },
    {
      name: 'December',
      value: 12
    },
  ]

  public datesWithWeekDays: Array<{date: number, day: string}> = [];

  public displayMonthName: string = '';

  public teamLeaves: Array<any> = [];

  public isAdmin = false;

  public allTeams = [];

  public generatingReport = false;

  constructor(
    private toaster: ToastService,
    private api: ApiService,
    private permissionService: PermissionService,
    private cache: CacheService
  )
  {

  }

  get loadCalendarButtonDisabled(): boolean
  {
    return (this.selectedMonth === this.lastSelectedMonth && this.selectedTeam === this.lastSelectedTeam) || !this.selectedMonth;
  }

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.permissionService.hasPermission('ADMIN');
    if(this.isAdmin)
    {
      this.loadAllTeams();
    }
    this.loadTeamCalendar();
  }

  async loadAllTeams()
  {
    this.api.get(`/teams/get-all-teams`).subscribe({
      next: (response: any) => {
        this.allTeams = response.data;
      },
      error: (err: any) => {
        this.toaster.error(err.message);
      },
      complete: () => {

      }
    });
  }

  private generateDatesWithWeekDays()
  {
    this.datesWithWeekDays = [];
      const result = [];
      const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      for (let date = 1; date <= daysInMonth; date++) {
        const currentDay = new Date(this.selectedYear, this.selectedMonth - 1, date).toLocaleDateString('en-US', { weekday: 'short' });
        result.push({ date, day: currentDay });
      }
      this.datesWithWeekDays = result;
  }

  loadTeamCalendar()
  {
    if(this.selectedMonth === this.lastSelectedMonth && this.selectedTeam === this.lastSelectedTeam || !this.selectedMonth)
    {
      return;
    }
    this.displayMonthName = this.months.find(x => x.value === Number(this.selectedMonth)).name;
    this.generateDatesWithWeekDays();
    this.teamLeaves = [];
    this.lastSelectedMonth = this.selectedMonth;
    if(this.isAdmin)
    {
      this.lastSelectedTeam = this.selectedTeam;
    }
    let url = `/leaves/team-leaves/${this.selectedYear}/${this.selectedMonth}`;
    if(this.isAdmin && !!this.selectedTeam)
    {
      url = `/leaves/team-leaves/${this.selectedYear}/${this.selectedMonth}/${this.selectedTeam}`;
    }
    this.loading = true;
    this.api.get(url).subscribe({
      next: (response: any) => {
        this.teamLeaves = response.data;
        this.loading = false;
      },
      error: (err: any) => {
        this.toaster.error(err.message);
        this.loading = false;
      },
      complete: () => {

      }
    });
  }

  public getLeave(leaves: Array<{date: number, status: string}>, currentDate: number): boolean
  {
    return leaves.findIndex(x => x.date === currentDate) > -1;
  }

  public getLeaveStatus(leaves: Array<{date: number, status: string}>, currentDate: number)
  {
    return leaves.find(x => x.date === currentDate)?.status;
  }

  downloadLeavePlan()
  {
    this.generatingReport = true;

    fetch(`${this.api.apiUrl}/leaves/download/leave-plan/${this.selectedYear}/${this.selectedMonth}`, {
      headers: {
        Authorization: `Bearer ${this.cache.get('token')}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `all-team-leave-plan-${this.displayMonthName}.csv`;
      link.click();
      this.generatingReport = false;
    })
    .catch((error) => {
      console.error('Error downloading file:', error);
      this.toaster.error('Unable to download report!');
      this.generatingReport = false;
    });
  }

}
