import {Injectable} from '@angular/core';

@Injectable()

export class SystemPopupService
{
  public popUp:any = null;
  constructor()
  {

  }

  public open(message?:any, title?:any, singleButton:boolean=false, trueButton?:string, falseButton?:string): Promise<any> | any
  {
    if(this.popUp.opened === true)
    {
      return;
    }
    return this.popUp.open(message, title, singleButton, trueButton, falseButton);
  }

  public Close()
  {
    if(this.popUp.opened === false)
    {
      return;
    }
    this.popUp.opened = false;
  }
}
