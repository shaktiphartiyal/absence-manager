/**
 * @author Shakti Phartiyal
 * @desc Generic Textbox /email /numeric field
 */
import {Component, OnInit, EventEmitter, Input, Output, ViewChild, forwardRef} from '@angular/core';
import {
    NgModel,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS, NgForm, Validators, FormControl, Validator, ValidationErrors, AbstractControl
} from '@angular/forms';
import { BaseComponent, BaseComponentProvider } from '../base/BaseComponent';

@Component({
  selector: 'system-textbox',
  templateUrl: './system-textbox.component.html',
  styleUrls: ['./system-textbox.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: SystemTextboxComponent,
      multi: true,
    },
    {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => SystemTextboxComponent),
        multi: true,
    }
  ]
})
export class SystemTextboxComponent extends BaseComponent<any> implements OnInit, Validator {


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
  @ViewChild('txtBox', { static: false }) txtBox: any;
  @Input() type: 'text' | 'email' | 'number' | 'password' = 'text';

  public emailValid = true;
  public numberValid = true;

    public validate(c: FormControl) {
        this.ngDoCheck();
        return (this.errorsExist == null) ? null : this.errorsExist;
    }


  constructor() { 
    super();
  }

  ngOnInit() {
  }

  private isEmailValid(email: string) {
      let Re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return Re.test(String(email).toLowerCase());
  }

  ngDoCheck() {


    if(this.type === 'email')
    {
        if(this.isEmailValid(this.value))
        {
          this.emailValid = true;
          this.errorsExist = null;
        }
        else
        {
          this.emailValid = false;
            if(this.required === true)
            {
                if(this.value == "" || this.value == null || this.value == undefined)
                {
                    this.errorsExist = {required: true, email: true};
                }
                else
                {
                    this.errorsExist = {email: true};
                }
            }
            else
            {
                this.errorsExist = {email: true};
            }
        }
    }
    else if(this.type === 'number')
    {
      if(this.required === true)
      {
        if(this.value == '' || Number.isNaN(Number(this.value)) === true)
        {
          this.numberValid = false;
          this.errorsExist = {number: true};
        }
        else
        {
          this.numberValid = true;
          this.errorsExist = null;  
        }
      }
      else
      {
        if(this.value != '' && Number.isNaN(Number(this.value)) === true)
        {
          this.numberValid = false;
          this.errorsExist = {number: true};
        }
        else
        {
          this.numberValid = true;
          this.errorsExist = null;  
        }
      }
    }
    else
    {
      this.numberValid = true;
      this.emailValid = true;
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
}
