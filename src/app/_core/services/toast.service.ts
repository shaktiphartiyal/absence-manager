import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToastService
{

  constructor()
  {
    if(!(window as any)['tellmeCssSet'])
    {
      let css = `.tm_tm-error:before,.tm_tm-info:before,.tm_tm-success:before,.tm_tm-warn:before{font-style:normal;font-weight:700}.tm_alertMsg{position:fixed;margin:0 auto;display:flex;justify-content:center;align-items:center;z-index:999999;cursor:pointer;max-width:100%;white-space:nowrap}.tm_alertMsg .tm_alert{border-radius:0;position:relative;padding:10px 15px;font-size:14px!important;font-family:Arial,Verdana!important}span.tm_alert_progress{position:absolute;bottom:0;left:0;height:5px;width:100%;background:rgba(0,0,0,.4);transition:all .3s linear;-webkit-transition:all .3s linear;-ms-transition:all .3s linear;-moz-transition:all .3s linear}.tm_alertMsg .tm_alert-danger{background-color:#bd3431;color:#fff}.tm_alertMsg .tm_alert-info{background-color:#28828f;color:#fff}.tm_alertMsg .tm_alert-warn{background-color:#ffa225;color:#6b470d}.tm_alertMsg .tm_alert-success{background-color:#51a351;color:#fff}.tm_tm-error:before{content:"☢"}.tm_tm-success:before{content:"☑"}.tm_tm-info:before{content:"⚡"}.tm_tm-warn:before{content:"⚠"}`;
      let style = document.createElement('style');
      style.innerHTML = css;
      document.head.appendChild(style);
    }
  }

  private options:any = {
    errorClass: "tm_alert-danger",
    successClass: "tm_alert-success",
    infoClass: "tm_alert-info",
    warnClass: "tm_alert-warn",
    errorSymbol: "tm_tm-error",
    successSymbol: "tm_tm-success",
    infoSymbol: "tm_tm-info",
    warnSymbol: "tm_tm-warn",
    errorDisplayTimeout: 5,
    successDisplayTimeout: 5,
    infoDisplayTimeout: 5,
    warnDisplayTimeout: 5,
    alertClass: "tm_alertMsg",
    subAlertClass: "tm_alert",
    progressClass: "tm_alert_progress",
    position: "top-right",
    open: null,
    close: null
  };
  private curConfig:Array<any> = [];
  private curConfigIndex:number = 0;

  private alertDiv:any = null;
  private progress:number = 100;
  private fadeTimer:any = null;
  private config(options:any)
  {
    for (let key in options)
    {
      this.options[key] = options[key];
    }
  }

  private makeCurConfig(options:any,timeoutlet:any)
  {
    this.curConfig[this.curConfigIndex] = this.cloneObj(this.options);
    this.curConfigIndex = this.curConfig.length - 1;
    if(typeof(options) == "object")
    {
      for (let key in options)
      {
        this.curConfig[this.curConfigIndex][key] = options[key];
      }
    }
    if(typeof(options) == "number")
    {
      this.curConfig[this.curConfigIndex][timeoutlet] = options;
    }
  }

  public error(message:any, options?:any)
  {
    if(!message)
    {
      message = "Error";
    }
    this.makeCurConfig(options,'errorDisplayTimeout');
    this.makeAlert(this.curConfig[this.curConfigIndex].errorClass, this.curConfig[this.curConfigIndex].errorSymbol, message);
    this.displayAlert(this.curConfig[this.curConfigIndex].errorDisplayTimeout);
  }

  public success(message:any, options?:any)
  {
    if(!message)
    {
      message = "Success";
    }
    this.makeCurConfig(options,'successDisplayTimeout');
    this.makeAlert(this.curConfig[this.curConfigIndex].successClass, this.curConfig[this.curConfigIndex].successSymbol, message);
    this.displayAlert(this.curConfig[this.curConfigIndex].successDisplayTimeout);
  }

  public info(message:any, options?:any)
  {
    if(!message)
    {
      message = "Info";
    }
    this.makeCurConfig(options,'infoDisplayTimeout');
    this.makeAlert(this.curConfig[this.curConfigIndex].infoClass, this.curConfig[this.curConfigIndex].infoSymbol, message);
    this.displayAlert(this.curConfig[this.curConfigIndex].infoDisplayTimeout);
  }

  public warn(message:any, options?:any)
  {
    if(!message)
    {
      message = "Warning";
    }
    this.makeCurConfig(options,'warnDisplayTimeout');
    this.makeAlert(this.curConfig[this.curConfigIndex].warnClass, this.curConfig[this.curConfigIndex].warnSymbol, message);
    this.displayAlert(this.curConfig[this.curConfigIndex].warnDisplayTimeout);
  }

  private makeAlert(cssClass:any, symbol:any, message:any)
  {
    this.alertDiv = '<div class=" '+this.curConfig[this.curConfigIndex].subAlertClass+" "+cssClass+'"> <i class="'+symbol+'">&nbsp;</i>'+message+'<span class="'+this.curConfig[this.curConfigIndex].progressClass+'"></span></div>';
  }

  private displayAlert(timeout:any)
  {
    this.removePrevious();
    this.clearFadeTimeout();
    let alertx = document.createElement('div');
    alertx.innerHTML = this.alertDiv;
    alertx.className = this.curConfig[this.curConfigIndex].alertClass;
    this.setPosition(alertx);
    document.body.appendChild(alertx);
    alertx.style.width = this.computeMinWidth();
    this.fireOpenEvent();
    if(typeof(this.curConfig[this.curConfigIndex].open) == "function")
    {
      eval(this.curConfig[this.curConfigIndex].open());
    }
    alertx.addEventListener('click',(e) => {
      this.fadeOut(e.currentTarget);
    });
    if(timeout != 0)
    {
      this.runOut(timeout);
    }
  }

  private setPosition(alertx:any)
  {
    switch(this.curConfig[this.curConfigIndex].position)
    {
      case "top-center":
        alertx.style.top = "10px";
        alertx.style.right = "0";
        alertx.style.left = "0";
        break;
      case "top-right":
        alertx.style.top = "10px";
        alertx.style.right = "5px";
        break;
      case "top-left":
        alertx.style.top = "10px";
        alertx.style.left = "5px";
        break;
      case "bottom-center":
        alertx.style.bottom = "10px";
        alertx.style.right = "0";
        alertx.style.left = "0";
        break;
      case "bottom-left":
        alertx.style.bottom = "10px";
        alertx.style.left = "5px";
        break;
      case "bottom-right":
        alertx.style.bottom = "10px";
        alertx.style.right = "5px";
        break;
      default:
        alertx.style.top = "10px";
        alertx.style.right = "0";
        alertx.style.left = "0";
    }
  }

  private computeMinWidth()
  {
    let width:any = document.getElementsByClassName(this.curConfig[this.curConfigIndex].subAlertClass)[0].clientWidth;
    if(width > window.innerWidth)
    {
      width = "100%";
    }
    else
    {
      if(width < 200)
      {
        width = 200;
      }
      width = width+"px";
    }
    return width;
  }

  private removePrevious(){
    for(let i=0;i<document.getElementsByClassName(this.curConfig[this.curConfigIndex].alertClass).length;i++)
    {
      document.getElementsByClassName(this.curConfig[this.curConfigIndex].alertClass)[i].parentNode?.removeChild(document.getElementsByClassName(this.curConfig[this.curConfigIndex].alertClass)[i]);
    }
  }

  private runOut(timeout:any)
  {
    this.fadeTimer = setTimeout(() => {
      this.progress =  this.progress - ((10000)/(timeout * 1000));
      try
      {
        if (document.getElementsByClassName(this.curConfig[this.curConfigIndex].progressClass).length > 0)
        {
          (document.getElementsByClassName(this.curConfig[this.curConfigIndex].progressClass)[0] as any).style.width = this.progress + "%";
        }
        else
        {
          this.clearFadeTimeout();
        }
      }
      catch(e)
      {}
      if(this.progress > -1)
      {
        this.runOut(timeout);
      }
      else
      {
        this.clearFadeTimeout();
        this.closeAlert();
      }
    }, 100);
  }

  private closeAlert()
  {
    try
    {
      let elems = document.getElementsByClassName(this.curConfig[this.curConfigIndex].alertClass);
      for (let i = 0; i < elems.length; i++) {
        this.fadeOut(elems[i]);
      }
    }
    catch(e)
    {}
  }

  private fadeOut(element:any)
  {
    let op = 1;
    let timer = setInterval(() => {
      if (op <= 0.1){
        clearInterval(timer);
        element.style.display = 'none';
        element.remove();
        this.curConfig.splice(this.curConfigIndex, 1);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
    }, 20);
    this.fireCloseEvent();
    if(typeof(this.curConfig[this.curConfigIndex].close) == "function")
    {
      eval(this.curConfig[this.curConfigIndex].close());
    }
  }

  private fireCloseEvent()
  {
    let event = new Event("tellmeClosed",{
        bubbles: true,
        cancelable: true
      }
    );
    document.dispatchEvent(event);
  }

  private fireOpenEvent()
  {
    let event = new Event("tellmeStart",{
        bubbles: true,
        cancelable: true
      }
    );
    document.dispatchEvent(event);
  }

  private clearFadeTimeout ()
  {
    window.clearTimeout(this.fadeTimer);
    this.fadeTimer = null;
    this.progress = 100;
  }

  private cloneObj(obj:any)
  {
    if (null == obj || "object" != typeof obj) return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }


}