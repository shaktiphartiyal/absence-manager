/**
 * @author Shakti Phartiyal
 * @desc Generic textarea component (kendo wrapper)
 */
 import {
  Component, OnInit, EventEmitter, Input, Output, ViewChild, forwardRef, OnChanges,
  SimpleChanges
} from '@angular/core';
import { BaseComponent, BaseComponentProvider } from '../base/BaseComponent';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS, NgForm, Validators, Validator, FormControl
} from '@angular/forms';

@Component({
  selector: 'system-textarea',
  templateUrl: './system-textarea.component.html',
  styleUrls: ['./system-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SystemTextareaComponent,
      multi: true,
    },
    {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => SystemTextareaComponent),
        multi: true,
    }
  ],
})
export class SystemTextareaComponent extends BaseComponent<any> implements OnInit,Validator {

  @Input() label: string = '';
  public elementId: string =
  (this.label === '') ? Math.random().toString(36).substring(2, 9) : this.label.replace(' ', '');
  @Input() text: string = '';
  @Input() labelClass = 'col-md-5';
  @Input() inputClass = 'col-md-7';
  @Input() placeholder: string = '';
  @Input() disabled:boolean = false;
  @Input() required:boolean = false;
  @Input() maxValue: any = 9999999999999999;
  @Input() minValue: any = 0;
  @Input() readOnly: boolean = false;
  @Input() maxLength:any = null;
  @Input() formRef: NgForm | undefined;
  @Input() iconTooltip: any = false;
  @Input() tabIndex:any=0;
  @Input() inLine: boolean = true;


  @ViewChild(NgModel, { static: false }) model!: NgModel;
  @ViewChild('TxtArea', { static: false }) txtArea: any;
  @Input() rows: any;
  @Input() cols: any;


constructor() { 
  super();
}

  public validate(c: FormControl) {
      this.ngDoCheck();
      return (this.errorsExist == null) ? null : this.errorsExist;
  }

ngOnInit() {

}

ngDoCheck() {
    if(this.required === true)
    {
        if(this.value == "" || this.value == null || this.value == undefined)
        {
            this.errorsExist = {required: true};
        }
        else
        {
            this.errorsExist = null;
        }
    }
    else
    {
        this.errorsExist = null;
    }
}

}
