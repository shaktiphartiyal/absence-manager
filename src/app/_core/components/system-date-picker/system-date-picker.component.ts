import {Component, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {
    NgModel,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS, NgForm, Validators, Validator, FormControl
} from '@angular/forms';
import { BaseComponent, BaseComponentProvider } from '../base/BaseComponent';

@Component({
    selector: 'system-date-picker',
    templateUrl: './system-date-picker.component.html',
    styleUrls: ['./system-date-picker.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: SystemDatePickerComponent,
        multi: true,
      },
        {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => SystemDatePickerComponent),
        multi: true,
        }
    ]
})
export class SystemDatePickerComponent extends BaseComponent<any> implements OnInit, Validator {
    @ViewChild(NgModel, { static: false }) model!: NgModel;
    @ViewChild('datePicker', { static: false }) datePicker: any;


    @Input() label: string = '';
    public elementId: string =
    (this.label === '') ? Math.random().toString(36).substring(2, 9) : this.label.replace(' ', '');
    @Input() placeholder: string = '';
    @Input() labelClass = 'col-md-5';
    @Input() inputClass = 'col-md-7';
    @Input() disabled:boolean = false;
    @Input() required:boolean = false;
    @Input() readOnly: boolean = false;
    @Input() formRef: NgForm | undefined;
    @Input() iconTooltip: any = false;
    @Input() tabIndex:any=0;
    @Input() inLine: boolean = true;

    constructor() {
        super();
    }


    ngOnInit() {
    }



  public validate(c: FormControl) {
    this.ngDoCheck();
    return (this.errorsExist == null) ? null : this.errorsExist;
  }


  ngDoCheck()
  {
    this.errorsExist = {};
    if(!this.dateValid)
    {
      this.errorsExist['dateInvalid'] = true;
    }
    else
    {
      this.errorsExist = null;
    }
    if((this.value == "" || this.value == null || this.value == undefined) && this.required == true)
    {
      if(this.errorsExist == null)
      {
        this.errorsExist = {};
      }
      this.errorsExist['required'] = true;
    }

  }

  private get dateValid()
  {
    const date1:any = new Date(this.value);
    const date2:any = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffYears:any = Math.ceil(diffTime / (1000 * 60 * 60 * 24*365));
    if(diffYears > 99)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

}
