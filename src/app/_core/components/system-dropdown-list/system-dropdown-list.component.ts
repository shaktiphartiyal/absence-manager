/**
 * @author Shakti Phartiyal
 * @desc Generic Dropdown list
 */
import {
    Component, OnInit, Inject, Input, Optional, ViewChild, OnChanges, SimpleChanges,
    ContentChildren, Output, EventEmitter, forwardRef, ChangeDetectorRef
} from '@angular/core';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS, NgForm, Validators, FormControl, Validator, ValidationErrors, AbstractControl
} from '@angular/forms';
import { BaseComponent, BaseComponentProvider } from '../base/BaseComponent';


interface Item {
  text: string,
  value: number
}

@Component({
  selector: 'system-dropdown-list',
  templateUrl: './system-dropdown-list.component.html',
  styleUrls: ['./system-dropdown-list.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: SystemDropdownListComponent,
      multi: true,
    },
    {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => SystemDropdownListComponent),
        multi: true,
    }
  ],
})
export class SystemDropdownListComponent extends BaseComponent<any> implements OnInit, OnChanges, Validator {
  @ViewChild(NgModel, { static: false }) model!: NgModel;
  @ViewChild('ddl', { static: false }) ddl: any;
  public listItems: any = [];

  @Input() label: string = '';
  public elementId: string =
  (this.label === '') ? Math.random().toString(36).substring(2, 9) : this.label.replace(' ', '');
  @Input() placeholder: string = '--Please Select--';
  @Input() data:Array<any> = [];
  @Input() labelClass = 'col-md-5';
  @Input() inputClass = 'col-md-7';
  @Input() disabled:boolean = false;
  @Input() required:boolean = false;
  @Input() readOnly: boolean = false;
  @Input() formRef: NgForm | undefined;
  @Input() iconTooltip: any = false;
  @Input() tabIndex:any=0;
  @Input() inLine: boolean = true;


  @Output() onValueChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectionChange:EventEmitter<any> = new EventEmitter<any>();
  private originalData:any = [];

  constructor(private cdr: ChangeDetectorRef)
  {
    super();
  }

    public validate(c: FormControl) {
        this.ngDoCheck();
        return (this.errorsExist == null) ? null : this.errorsExist;
    }


  ngOnInit() {
    if(!!this.data && this.data.length > 0)
    {
        let temp:Array<any> = [];
        if(!!this.placeholder)
        {
          temp = [{
            name: this.placeholder,
            value: '',
            active:  1
          }, ...this.data];
        }
        temp = temp.filter((v,i,a)=>a.findIndex(v2=>(v2.value===v.value))===i);
        this.data = temp;
        this.originalData = this.data;
        this.listItems = this.data;
    }
    else
    {
      this.data = [{
        name: this.placeholder,
        value: '',
        active: 1
      }];
    }
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if("data" in changes)
    {
        this.originalData = this.data;
        if (!!changes['data'].currentValue) {
            this.listItems = changes['data'].currentValue;
        }
        this.ngOnInit();
    }
  }


    ngDoCheck()
    {
        if (this.required === true) {
            if (this.value == "" || this.value == null || this.value == undefined) {
                this.errorsExist = {required: true};
            }
            else {
                this.errorsExist = null;
            }
        }
        else {
            this.errorsExist = null;
        }
    }

    valueChange(event:any)
    {
      this.onValueChange.emit(event);
    }


    selectionChange(event:any)
    {
        this.onSelectionChange.emit(event);
    }




}
