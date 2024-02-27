import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SystemPopupService} from './system-popup.service';

@Component({
  selector: 'system-popup',
  templateUrl: './system-popup.component.html',
  styleUrls: ['./system-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SystemPopupComponent implements OnInit
{
  @ViewChild('popupComponent', {static: false}) popupComponent:any;
  @ViewChild('trueBtn', {static: false}) trueBtn:any;
  public opened: boolean = false;

  private _internalMessage: any = 'Are you sure you want to continue ?';
  public message: any;

  private _internalTitle: any = 'Confirmation required !';
  public title: any;

  public singleButton:boolean = false;

  public trueButton:string = 'Yes';
  public falseButton:string = 'No';


  private promiseDefs:any = {};

  constructor(private PService: SystemPopupService) {
    PService.popUp = this;
  }

  ngOnInit() {

  }

  public open(message?:any, title?:any, singleButton:boolean=false, trueButton?:string, falseButton?:string): Promise<any>
  {
    this.message = this._internalMessage;
    this.title = this._internalTitle;

    this.singleButton = singleButton;

    if (!!message) {
      this.message = message;
    }
    if (!!title) {
      this.title = title;
    }

    if(!!trueButton)
    {
      this.trueButton = trueButton;
    }

    if(!!falseButton)
    {
      this.falseButton = falseButton;
    }

    return new Promise((resolve, reject) => {
      this.promiseDefs = {resolve: resolve, reject: reject};
      this.popupComponent.nativeElement.style.display = 'block';
      setTimeout(() => {
        this.opened = true;
        this.trueBtn.nativeElement.focus();
      });
    });
  }

  closePopUp(status:any)
  {
    this.opened = false;
    this.popupComponent.nativeElement.style.display = 'none';
    this.promiseDefs.resolve(status);
  }
}