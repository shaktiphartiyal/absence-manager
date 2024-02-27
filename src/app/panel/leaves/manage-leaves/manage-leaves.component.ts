import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService, ToastService } from 'src/app/_core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-manage-leaves',
  templateUrl: './manage-leaves.component.html',
  styleUrls: ['./manage-leaves.component.scss']
})
export class ManageLeavesComponent {

  @ViewChild('calendar', {static: true}) calendar!: CalendarComponent

  public selectedYear = new Date().getFullYear();
  public selectedDates: Array<Date> = [];
  public appliedLeaves: Array<number> = [];
  public approvedLeaves: Array<number> = [];
  public rejectedLeaves: Array<number> = [];

  public reason: string = '';

  public openPopup:boolean = false;
  public popupTitle: string = '';
  public _action!: 'APPLY' | 'CANCEL';
  public loading: boolean = false;

  constructor(
    private toaster: ToastService,
    private api: ApiService,
  )
  {

  }

  ngOnInit() {
      this.loadLeaves();
  }

  set action(action: 'APPLY' | 'CANCEL')
  {
    if(action === 'APPLY')
    {
      this._action = 'APPLY';
      this.popupTitle = 'Apply for leaves';
    }
    else
    {
      this._action = 'CANCEL';
      this.popupTitle = 'Cancel leaves';
    }
    this.openPopup = true;
  }

  get action(): 'APPLY' | 'CANCEL'
  {
    return this._action;
  }

  get applyForLeavesDisabled(): boolean
  {
    return this.selectedDates.map((x:Date) => x.getTime()).some( item => this.appliedLeaves.includes(item) || this.approvedLeaves.includes(item) || this.rejectedLeaves.includes(item));
  }

  get cancelLeavesDisabled(): boolean
  {
    return this.selectedDates.map((x:Date) => x.getTime()).some( item => !(this.appliedLeaves.includes(item) || this.approvedLeaves.includes(item) || this.rejectedLeaves.includes(item)));
  }

  datesSelected(dates: Array<Date>)
  {
    this.selectedDates = dates;
  }


  handleOnPopupClose()
  {
    this.openPopup = false;
    this.reason = '';
  }

  applySelectedLeaves()
  {
    this.action = 'APPLY';
  }


  cancelSelectedLeaves()
  {
    this.action = 'CANCEL';
  }

  removeSelectedDateByIndex(index:number)
  {
    this.selectedDates.splice(index, 1);
  }

  handleOnSave()
  {
      if(this.selectedDates.length == 0)
      {
        this.toaster.error('Please select dates first !');
        return;
      }
      this.loading = true;
      if(this.action === 'APPLY')
      {
        this.api.post(`/leaves/apply`, {
          selectedDates: this.selectedDates,
          reason: this.reason
        }).subscribe({
          next: (response: any) => {
            this.toaster.success(response.message);
            this.handleOnPopupClose();
            this.loadLeaves();
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
      else
      {
        this.api.post(`/leaves/cancel`, {
          selectedDates: this.selectedDates,
          reason: this.reason
        }).subscribe({
          next: (response: any) => {
            this.toaster.success(response.message);
            this.handleOnPopupClose();
            this.loadLeaves();
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
  }

  loadLeaves()
  {
    this.selectedDates = [];
    this.appliedLeaves = [];
    this.approvedLeaves = [];
    this.rejectedLeaves = [];
    this.calendar.refresh();
    this.api.get(`/leaves/${this.selectedYear}`).subscribe({
      next: (response: any) => {
        this.appliedLeaves, this.approvedLeaves, this.rejectedLeaves = [];
        const leaves = response.data.leaves;
        for(let leave of leaves)
        {
          if(leave.status === 0)
          {
            this.appliedLeaves.push(leave.leave_date)
          }
          else if (leave.status === 1)
          {
            this.approvedLeaves.push(leave.leave_date);
          }
          else if(leave.status === 2)
          {
            this.rejectedLeaves.push(leave.leave_date);
          }
        }
      },
      error: (err: any) => {
        this.toaster.error('Unable to load leaves!');
      },
      complete: () => {

      }
    });
  }



}
