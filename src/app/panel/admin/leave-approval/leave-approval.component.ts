import { Component, EventEmitter, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseListComponent, DateFormatPipe } from "src/app/_core";
import { GridComponent } from "src/app/_core";
import { SystemPopupService } from "src/app/_core";
import { ApiService, AppConfig, ToastService } from "src/app/_core";

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent extends BaseListComponent{


  public editMode:boolean = false;

  @ViewChild('leaveApprovalGrid', { static: true }) override grid!: GridComponent;

  public override gridData: any = {
    total: 0,
    config: {
      maxRows: 10,
      rowsClickable: true
    },
    columns: [
      {
        name: 'Select',
        selector: true,
        width: '100px'
      },
      {
        name: "Signum",
        field: "signum",
        sortable: true,
      },
      {
        name: "Name",
        field: "name"
      },
      {
        name: "Requested leave",
        field: "leave_date",
        sortable: true,
      },
      {
        name: "Team",
        field: "team_name"
      },
      {
        name: 'Applied On',
        filed: 'apply_date'
      },
      {
        name: 'Action',
        action: true
      },
    ],
    data: [
    ]
  };

  public customButtons: Array<{
    show: boolean,
    disabled: boolean,
    clickEventId: string,
    buttonClass:string,
    showButtonIcon: boolean,
    buttonIconClass?: string,
    showButtonText: boolean,
    buttonText?: string
    }> = [
    {
      show: true,
      disabled: true,
      clickEventId: 'BULK_ACTION',
      buttonClass: 'btn btn-sm btn-warning data-box-control-btn mr-1',
      showButtonIcon: true,
      buttonIconClass: 'fa fa-info-circle',
      showButtonText: true,
      buttonText: 'Bulk action'
    }
  ];

  public popupCustomButtons: Array<{
    show: boolean,
    disabled: boolean,
    clickEventId: string,
    buttonClass:string,
    showButtonIcon: boolean,
    buttonIconClass?: string,
    showButtonText: boolean,
    buttonText?: string
    }> = [
    {
      show: true,
      disabled: false,
      clickEventId: 'APPROVE',
      buttonClass: 'btn btn-sm btn-success data-box-control-btn mr-1',
      showButtonIcon: true,
      buttonIconClass: 'fa fa-check-circle',
      showButtonText: true,
      buttonText: 'Approve'
    },
    {
      show: true,
      disabled: false,
      clickEventId: 'REJECT',
      buttonClass: 'btn btn-sm btn-danger data-box-control-btn mr-1',
      showButtonIcon: true,
      buttonIconClass: 'fa fa-times-circle',
      showButtonText: true,
      buttonText: 'Reject'
    },
    
  ];


  public selectedLeaves: Array<any> = [];


  public popupTitle = '';
  public singleSelectedLeave:any = null;
  public popupOpen:boolean = false;
  public approverReason: string | undefined = undefined;
  public popupOperation!: 'APPROVE' | 'REJECT';
  public bulkPopupOpenOperation!: 'BULK_APPROVE' | 'BULK_REJECT';

  private dateFormatPipe:any;

  constructor(
    protected activatedRoute: ActivatedRoute,
    api: ApiService,
    router: Router,
    popup: SystemPopupService,
    private config: AppConfig,
    private toaster: ToastService,
  )
  {
    super(api, router, popup);
    this.setProps('/leave-approval', '/panel/admin/leave-approval/details');
    this.dateFormatPipe = new DateFormatPipe(config);
  }


  get leavesSelected() :boolean
  {
    return this.selectedLeaves.length > 0;
  }


  private getWeekDay(date: Date) :string
  {
    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    return weekDays[date.getDay()];
  }

  public override onRowClick(record:any)
  {
    this.singleSelectedLeave = record;
    this.popupTitle = 'Leave details';
    this.popupOpen = true;
  }

  public singleRejectLeave(record:any)
  {
    this.popup.open(`Are you sure you want to <b>reject</b> the leave of <b>${record.name}</b> for <b>${this.getWeekDay(new Date(record.leave_date))}, ${this.dateFormatPipe.transform(record.leave_date)}</b> ?`, 'Reject confirmation').then((result:any) => {
      if(result)
      {
        this.send_reject_call([record]);
      }
    });
  }
  public singleApproveLeave(record:any)
  {
    this.popup.open(`Are you sure you want to <b>approve</b> the leave of <b>${record.name}</b> for <b>${this.getWeekDay(new Date(record.leave_date))}, ${this.dateFormatPipe.transform(record.leave_date)}</b> ?`, 'Approve confirmation').then((result:any) => {
      if(result)
      {
        this.send_approve_call([record]);
      }
    });
  }

  public handleOnCustomButtomClick(eventId: string)
  {
    this.singleSelectedLeave = null;
    this.popupOpen = true;
  }

  public handleOnPopupCustomButtomClick(eventId: string, formRef: NgForm)
  {
    if(eventId == 'APPROVE')
    {
      this.popupOperation = 'APPROVE'
    }
    else
    {
      this.popupOperation = 'REJECT';
    }
    (formRef as any).submitted = true;
    formRef.ngSubmit.emit();
  }

  selectLeave(event:any, record: any)
  {
    const isChecked = event.target.checked;
    const recordId = record.leave_id;
    const existingRecordIndex = this.selectedLeaves.findIndex((x:any) => x.leave_id === recordId);
    if(isChecked)
    {
      if(existingRecordIndex === -1)
      {
        this.selectedLeaves.push(record);
      }
    }
    else
    {
      if(existingRecordIndex > -1)
      {
        this.selectedLeaves.splice(existingRecordIndex, 1);
      }
    }
    this.setCustomButtonState();
  }

  private setCustomButtonState()
  {
    if(this.selectedLeaves.length > 0)
    {
      this.customButtons.map(x => x.disabled = false);
    }
    else
    {
      this.customButtons.map(x => x.disabled = true);
    }
  }

  override onPageChange(event: any)
  {
    super.onPageChange(event);
    this.emptySelectedLeaves();
  }

  public emptySelectedLeaves()
  {
    try
    {
      const selectors = document.querySelectorAll('.select-leave-checkbox');
      selectors.forEach((x: any) => {
        x.checked = false;
        const event = new Event("change", {"bubbles":false, "cancelable":true});
        x.dispatchEvent(event);
      })
    }
    catch(e){}
    this.selectedLeaves = [];
    this.setCustomButtonState();
  }


  handleOnPopupCancel()
  {
    this.popupOpen = false;
    this.singleSelectedLeave = null;
    this.emptySelectedLeaves()
    this.approverReason = '';
  }




  handleOnPopupSave()
  {
    if(this.popupOperation === 'APPROVE')
    {
      this.send_approve_call(this.singleSelectedLeave ? [this.singleSelectedLeave] : this.selectedLeaves, this.approverReason);
    }
    else
    {
      this.send_reject_call(this.singleSelectedLeave ? [this.singleSelectedLeave] : this.selectedLeaves, this.approverReason);
    }
    this.handleOnPopupCancel();
  }

  private send_approve_call(leaves: Array<any>, reason: string|undefined = undefined)
  {
    const leavesToApprove = leaves.map(x => x.leave_id);
    this.customButtons.map(x => x.disabled = true);
    this.loading();
    this.subscriptions['lac'] = this.api.post(`/leave-approval/approve`, {
      leaves: leavesToApprove,
      approverReason: reason
    }).subscribe({
      next: (response: any) => {
        this.toaster.success(response.message);
        this.loadDataForList();
        this.customButtons.map(x => x.disabled = false);
      },
      error: (err: any) => {
        this.loading(false);
        this.toaster.error(err.message);
        this.customButtons.map(x => x.disabled = false);
      },
      complete: () => {
        this.loading(false);
      }
    });
  }

  private send_reject_call(leaves: Array<any>, reason: string|undefined = undefined)
  {
    const leavesToReject = leaves.map(x => x.leave_id);
    this.customButtons.map(x => x.disabled = true);
    this.loading();
    this.subscriptions['lrc'] = this.api.post(`/leave-approval/reject`, {
      leaves: leavesToReject,
      approverReason: this.approverReason
    }).subscribe({
      next: (response: any) => {
        this.toaster.success(response.message);
        this.loadDataForList();
        this.customButtons.map(x => x.disabled = false);
      },
      error: (err: any) => {
        this.loading(false);
        this.toaster.error(err.message);
        this.customButtons.map(x => x.disabled = false);
      },
      complete: () => {
        this.loading(false);
      }
    });
  }
}
