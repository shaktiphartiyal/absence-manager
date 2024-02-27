import { Component, OnInit, EventEmitter, Input, Output ,ViewChild, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { BaseComponent, BaseComponentProvider } from '../base/BaseComponent';
import {
  NgModel,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  NgForm,
  FormControl,
  Validator
} from '@angular/forms';
@Component({
  selector: 'system-checkbox',
  templateUrl: './system-checkbox.component.html',
  styleUrls: ['./system-checkbox.component.scss'],
  providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SystemCheckboxComponent,
        multi: true,
    },
    {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => SystemCheckboxComponent),
        multi: true,
    }],
})
//@TODO: FIELD becomes invalid but form is still valid.
export class SystemCheckboxComponent extends BaseComponent<any> implements OnInit, OnChanges, Validator {


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


    @Input() checkedValues: any[] = [];
    @ViewChild(NgModel, { static: false }) model!: NgModel;
    @ViewChild('chkBox', { static: false }) chkBox: any;
    @Input() options: Array<{key: any, value: any, selected?: boolean}> = [];
    @Input() labelOnRight: boolean = false;
    
    constructor() { 
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(('options' in changes && !!changes['options'].currentValue) || ('checkedValues' in changes && !!changes['checkedValues'].currentValue))
        {
            this.preSelectOptions();
        }
    }

    public validate(c: FormControl) {
        this.ngDoCheck();
         return (this.errorsExist == null) ? null : this.errorsExist;
    }

    ngDoCheck() {
        if(this.required === true)
        {
            if(this.value == "" || this.value == null || this.value == undefined || this.value?.length < 1)
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

    ngOnInit() {
    }

    private preSelectOptions()
    {
        for(let i = 0; i < this.options.length; i++)
        {
            if(this.checkedValues.findIndex(x => x === this.options[i].value) !== -1)
            {
                this.options[i].selected = true;
            }
            else
            {
                this.options[i].selected = false;
            }
        }
    }

    handleChange(option:any, event:any) {
        const isChecked = (<HTMLInputElement>event.target).checked;
        const valueIndex = this.options.findIndex((x:any) => x.value === option.value);
        if(isChecked)
        {
            if('selected' in this.options[valueIndex])
            {
                this.options[valueIndex]['selected'] = true;
            }
            else
            {
                Object.defineProperty(this.options[valueIndex], 'selected', {
                    value: true,
                    writable: true
                });
            }
            const selectedIndex = this.selectedValue.findIndex((x:any) => x === option.value);
            if(selectedIndex === -1)
            {
                this.selectedValue.push(option.value);
            }
        }
        else
        {
            if('selected' in this.options[valueIndex])
            {
                this.options[valueIndex]['selected'] = false;
            }
            else
            {
                Object.defineProperty(this.options[valueIndex], 'selected', {
                    value: false,
                    writable: true
                });
            }
            const selectedIndex = this.selectedValue.findIndex((x:any) => x === option.value);
            if(selectedIndex !== -1)
            {
                this.selectedValue.splice(selectedIndex, 1);
            }
        }
        this.value = this.selectedValue;
    }

}