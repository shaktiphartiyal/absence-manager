import {Inject, Injectable, OnDestroy, OnInit} from '@angular/core';
import {BaseUtilsComponent} from './BaseUtilsComponent';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Injectable()
export abstract class BaseDetailComponent extends BaseUtilsComponent implements OnInit, OnDestroy
{
  public pageTitle!:string;
  public addMode:boolean = true;
  public model: any = {
  };
  public primaryKey:any;

  protected previousPageUrl?: string;
  public displayName?: string;
  protected tableName?:string;

  constructor(
    protected api: ApiService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  protected setProps(previousPageUrl?: string, displayName?: string, tableName?: string)
  {
    this.previousPageUrl =  previousPageUrl;
    this.displayName =  displayName;
    this.tableName = tableName;
  
  }

  override ngOnInit()
  {
    super.ngOnInit();
    if(this.activatedRoute.snapshot.routeConfig?.path?.endsWith('add'))
    {
      this.primaryKey = null;
      this.addMode = true;
      this.pageTitle = `Add ${this.displayName}`;
    }
    else
    {
      this.primaryKey = this.activatedRoute.snapshot.params['primaryKey'];
      this.addMode = false;
      this.pageTitle = `${this.displayName} details`;
    }
  }

  override ngOnDestroy()
  {
    super.ngOnDestroy();

  }

  onCancel()
  {
    this.goToListing(0);
  }

  goToListing(timeout = 500)
  {
    setTimeout(() => {
      this.router.navigate([this.previousPageUrl]);
    }, timeout);
  }


  onSave()
  {
    console.log("IMPLEMENT");
  }

}