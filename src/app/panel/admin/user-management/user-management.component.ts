import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BaseListComponent, GridComponent, PermissionService } from "src/app/_core";
import { SystemPopupService } from "src/app/_core";
import { ApiService, AppConfig, ToastService } from "src/app/_core";


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent extends BaseListComponent {

  public editMode:boolean = false;
  public apiLoading: boolean = false;

  @ViewChild('userGrid', { static: true }) userGrid!: GridComponent;


  public managers: Array<any> = [];

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
  public userType = [
    {
      name: 'Admin',
      value: 1,
    },
    {
      name: 'Normal',
      value: 0
    }
  ];
  public allTeams = [];
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
        field: "name",
        sortable: true,
        sort: 'ASC'
      },
      {
        name: "Signum",
        field: "signum"
      },
      {
        name: "Email",
        field: "email"
      },
      {
        name: "Manager",
        field: "manager_name"
      },
      {
        name: "Type",
        field: "is_admin"
      },
      {
        name: "Team",
        field: "team_name"
      },
      {
        name: "Status",
        field: "active"
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
    signum: null,
    email: null,
    team_id: null,
    active: 1,
    is_admin: 0,
    manager_id: ''
  };

  public isAdmin = false;


  public bulkAddResponse: Array<any> = [];
  public csvHasErrors = false;
  public csvErrors: Array<string> = ['Please select a file.'];
  public fileValid:any = '';
  private csvData: Array<any> = [];
  public bulkFile: File | string = '';
  public bulkAddPopup: boolean = false;
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
      disabled: false,
      clickEventId: 'BULK_USER_UPLOAD',
      buttonClass: 'btn btn-sm btn-warning data-box-control-btn mr-1',
      showButtonIcon: true,
      buttonIconClass: 'fa fa-users',
      showButtonText: true,
      buttonText: 'Bulk upload'
    }
  ];



  constructor(
    protected activatedRoute: ActivatedRoute,
    api: ApiService,
    router: Router,
    popup: SystemPopupService,
    private config: AppConfig,
    private toaster: ToastService,
    private permissionService: PermissionService
  )
  {
    super(api, router, popup);
    this.setProps('/users', '/panel/admin/user-management');
  }

  private emptyModel()
  {
    this.model = {
      id: 0,
      name: null,
      signum: null,
      email: null,
      team_id: null,
      active: 1,
      is_admin: 0,
      manager_id: ''
    };
  }

  override async ngOnInit()
  {
    this.loadUsers();
    this.loadManagers();
    this.loadAllTeams();
    this.isAdmin = await this.permissionService.hasPermission('ADMIN');
  }

  loadUsers()
  {
    this.loading();
    let queryString = this.userGrid.generateQueryString();
    this.subscriptions['upmd'] = this.api.get(`/users?${queryString}`).subscribe({
      next: (response: any) => {
        this.gridData.data = response.data.data;
        this.gridData.total = response.data.total;
      },
      error: (err: any) => {
        this.loading(false);
      },
      complete: () => {
        this.loading(false);
      }
    });
    this.loadManagers();
  }


  loadManagers()
  {
    this.loading();
    this.subscriptions['upman'] = this.api.get(`/users/get-managers`).subscribe({
      next: (response: any) => {
        this.managers = response.data.managers;
      },
      error: (err: any) => {
        this.loading(false);
      },
      complete: () => {
        this.loading(false);
      }
    });
  }
  
  loadAllTeams()
  {
    this.loading();
    this.subscriptions['lat'] = this.api.get(`/teams/get-all-teams`).subscribe({
      next: (response: any) => {
        this.allTeams = response.data;
      },
      error: (err: any) => {
        this.loading(false);
      },
      complete: () => {
        this.loading(false);
      }
    });
  }

  handlePageChange(currentPage:any) {
    this.loadUsers();
  }


  public override delete(record:any)
  {
    this.popup.open().then((result:any) => {
      if(result === true)
      {
        this.loading();
        this.subscriptions['dpmu'] = this.api.delete(`/users/${record.id}`).subscribe({
          next: (response: any) => {
            this.loadUsers();
            this.toaster.success(response.message);
          },
          error: (err: any) => {
            this.loading(false);
            this.toaster.success(err.message);
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
    this.loadUsers();
  }

  handleOnPopupSave()
  {
    this.apiLoading = true;
    this.loading();
    let request = this.api.post(`/users`, this.model);
    if(this.editMode)
    {
      request = this.api.patch(`/users/${this.model.id}`, this.model);
    }
    this.subscriptions['spmd'] = request.subscribe({
      next: (response: any) => {
        this.toaster.success(response.message);
        this.handleOnAddClose();
        this.apiLoading = false;
      },
      error: (err: any) => {
        this.toaster.error(err.message);
        this.loading(false);
        this.apiLoading = false;
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
    this.loadUsers();
  }

  public handleOnCustomButtomClick(eventId: string)
  {
    this.fileValid = '';
    this.csvErrors = ['Please select a file.'];
    this.bulkFile = '';
    this.bulkAddPopup = true;
  }

  handleOnBulkAddClose()
  {
    this.bulkAddPopup = false;
    this.loadUsers();
    this.bulkAddResponse = [];
  }

  handleOnBulkPopupSave()
  {
    this.bulkAddResponse = [];
    this.apiLoading = true;
    this.loading();
    this.customButtons.map(x => x.disabled = true);
    this.subscriptions['uba'] = this.api.post(`/users/bulk-add`, {users: this.csvData}).subscribe({
      next: (response: any) => {
        try
        {
          for(let data of response.data.successfulEntries)
          {
            this.bulkAddResponse.push(`Success: ${data.username}/${data.signum} created with id #${data.id}`);
          }
        }
        catch(e)
        {
          this.toaster.success('Bulk users added.');
        }
        this.fileValid = '';
        this.bulkFile = '';
      },
      error: (err: any) => {
        this.bulkAddResponse.push(`Error: ${err.message}`);
        this.loading(false);
        this.apiLoading = false;
        this.customButtons.map(x => x.disabled = false);
      },
      complete: () => {
        this.apiLoading = false;
        this.loading(false);
        this.customButtons.map(x => x.disabled = false);
      }
    });
  }

  public onFileSelected(event: any): void {
    this.csvData = [];
    this.fileValid = '';
    const file = event.target.files[0];
    if (file) {
      this.csvErrors = [];
      if(file.name.endsWith('.csv') && file.type == "text/csv")
      {
        this.parseCsv(file);
      }
      else
      {
        this.csvHasErrors = true;
        this.csvErrors.push('Invalid file selected.');
      }
    }
  }

  private parseCsv(file: Blob)
  {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvData = e.target.result;
      this.processCSVData(csvData);
    };
    reader.readAsText(file);
  }

  private processCSVData(csvData: string): void {
    this.csvHasErrors = false;
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');
    if(headers.length != 8)
    {
      this.csvErrors.push('Incorrect number of headers');
      this.csvHasErrors = true;
    }
    if(headers[0] !== 'name' || headers[1] !== 'signum' || headers[2] !== 'username' || headers[3] !== 'password' || headers[4] !== 'is_admin' || headers[5] !== 'status' || headers[6] !== 'manager_signum' || headers[7] !== 'team')
    {
      this.csvErrors.push('Incorrect csv headers');
      this.csvHasErrors = true;
    }
    for (let i = 1; i < rows.length; i++)
    {
      const rowData = rows[i].split(',');
      if(rowData.length != 8)
      {
        this.csvErrors.push(`Inconsistent data at record ${i}`);
        this.csvHasErrors = true;
      }
      else
      {
        this.csvData.push({
          name: rowData[0],
          signum: rowData[1],
          username: rowData[2],
          password: rowData[3],
          is_admin: rowData[4],
          status: rowData[5],
          manager_signum: rowData[6],
          team_name: rowData[7]
        })
      }
    }
    if(this.csvHasErrors)
    {
      return;
    }
    this.fileValid = true;
  }

}
