import {Injectable, OnDestroy} from '@angular/core';

@Injectable()
export abstract class BaseUtilsComponent
{
  private _loading:number = 0;
  public subscriptions:any = {};
  public title:string = "";

  public loading(value:any = true)
  {
    if(!!value)
    {
      this._loading = this._loading+1;
    }
    else
    {
      this._loading = this._loading-1;
      if(this._loading < 0)
      {
        this._loading = 0;
      }
    }
  }

  public get loadingState()
  {
    return this._loading<1?false:true;
  }

  ngOnInit()
  {

  }

  ngOnDestroy()
  {
    for(let key of Object.keys(this.subscriptions))
    {
      try
      {
        this.subscriptions[key].unsubscribe();
      }
      catch(e)
      {
        this.subscriptions[key] = null;
      }
    }
  }
}