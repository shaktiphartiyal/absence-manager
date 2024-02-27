import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {SystemPopupService} from '../../components/system-popup/system-popup.service';
import {BaseUtilsComponent} from './BaseUtilsComponent';
import {GridComponent} from '../../components/grid/grid.component';
import {GridType} from '../../types/grid.type'

@Injectable()
export abstract class BaseListComponent extends BaseUtilsComponent implements OnInit, OnDestroy
{

  public grid?: GridComponent;
  public gridData!:GridType;

  protected listUrl?: string;
  protected detailUrl?: string;
  protected addUrl?:string;

  constructor(
    protected api: ApiService,
    protected router: Router,
    protected popup: SystemPopupService,
  )
  {
    super();
  }

  protected setProps(listUrl?: string, detailUrl?: string, addUrl?: string)
  {
    this.listUrl = listUrl;
    this.detailUrl = detailUrl;
    this.addUrl = addUrl;
  }

  override ngOnInit()
  {
    super.ngOnInit();
    this.loadDataForList();
  }

  override ngOnDestroy()
  {
    super.ngOnDestroy();
  }


  protected loadDataForList()
  {
    this.loading();
    this.api.get(this.getDataUrl()).subscribe({
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
  }

  public delete(record:any)
  {
    this.popup.open().then((result:any) => {
      if(result === true)
      {
        this.loading();
        this.api.delete(`${this.listUrl}/${record.id}`).subscribe({
          next: (response: any) => {

          },
          error: (err: any) => {
            this.loading(false);
          },
          complete: () => {
            this.loading(false);
          }
        });
      }
    });
  }

  private getDataUrl()
  {
    let queryString = this.grid?.generateQueryString();
    return `${this.listUrl}?${queryString}`
  }

  public onPageChange(currentPage:any)
  {
    this.loadDataForList();
  }


  public onSort(column:any)
  {
    this.loadDataForList();
  }

  public onRowClick(record:any)
  {
    this.router.navigate([this.detailUrl, record.id]);
  }

  public onAdd()
  {
    if(!this.addUrl)
    {
      return;
    }
    this.router.navigate([this.addUrl]);
  }

}