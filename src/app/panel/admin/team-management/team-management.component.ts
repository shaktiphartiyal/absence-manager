import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseListComponent } from "src/app/_core";
import { GridComponent } from "src/app/_core";
import { SystemPopupService } from "src/app/_core";
import { ApiService, AppConfig, ToastService } from "src/app/_core";


@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})

export class TeamManagementComponent extends BaseListComponent
{


  public editMode:boolean = false;

  @ViewChild('teamGrid', { static: true }) teamGrid!: GridComponent;

  public activeData = [
    {
      key: 'Active',
      value: 1
    },
    {
      key: 'Inactive',
      value: 0
    }
  ];
  public override gridData: any = {
    total: 0,
    config: {
      maxRows: 10,
      rowsClickable: true
    },
    columns: [
      {
        name: "Id",
        field: "id"
      },
      {
        name: "Name",
        field: "name"
      },

      {
        name: "Members",
        field: "member_count",
        sortable: true,
      },
      {
        name: "Status",
        field: "status"
      },
      {
        name: 'Action',
        action: true,
        width: 1
      },
    ],
    data: [
    ]
  };
  public addPopup:boolean = false;
  public model:any = {
    id: 0,
    name: null,
    members_count: 5,
    status: 1
  };

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
    this.setProps('/teams', '/panel/admin/team-management');
  }

  private emptyModel()
  {
    this.model = {
      id: 0,
      name: null,
      members_count: null,
      status: 1
    };
  }

  override ngOnInit()
  {
    this.loadTeams();
  }

  loadTeams()
  {
    this.loading();
    let queryString = this.teamGrid.generateQueryString();
    this.subscriptions['lpmd'] = this.api.get(`/teams?${queryString}`).subscribe({
      next: (response: any) => {
        this.gridData.data = response.data.data;
        this.gridData.total = response.data.total;
      },
      error: (err: any) => {
        this.toaster.error(err.message);
        this.loading(false);
      },
      complete: () => {
        this.loading(false);
      }
    });
  }

  handlePageChange(currentPage:any) {
    this.loadTeams();
  }


  public override delete(record:any)
  {
    this.popup.open().then((x:any) => {
      if(x === true)
      {
        this.loading();
        this.subscriptions['dpmd'] = this.api.delete(`/teams/${record.id}`).subscribe({
          next: (response: any) => {
            this.loadTeams();
            this.toaster.error(response.message);
          },
          error: (err: any) => {
            this.loading(false);
            this.toaster.error(err.message);
          },
          complete: () => {
            this.loading(false);
          }
        });
      }
    });
  }


  handleOnAdd()
  {
    this.emptyModel();
    this.editMode = false;
    this.addPopup = true;
  }

  handleOnAddClose()
  {
    this.editMode = false;
    this.addPopup = false;
    this.loadTeams();
  }

  handleOnPopupSave()
  {
    this.loading();
    let request = this.api.post(`/teams`, this.model);
    if(this.editMode)
    {
      request = this.api.patch(`/teams/${this.model.id}`, this.model);
    }
    this.subscriptions['spmd'] = request.subscribe({
      next: (response: any) => {
        this.toaster.success(response.message);
        this.handleOnAddClose();
      },
      error: (err: any) => {
        this.toaster.error(err.message);
        this.loading(false);
      },
      complete: () => {
        this.loading(false);
      }
    });
  }

  handleRowClick(data:any)
  {
    this.editMode = true;
    this.emptyModel();
    Promise.resolve().then(() => {
      this.model = data;
    });
    this.addPopup = true;
  }

  handleOnSort(event:any)
  {
    this.loadTeams();
  }
}
