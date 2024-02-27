/**
 * @author Shakti Phartiyal
 * @desc Generic radio button list
 */
import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, NgForm, NgModel, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BaseComponent, BaseComponentProvider } from '../base/BaseComponent';

@Component({
    selector: 'system-radio',
    templateUrl: './system-radio.component.html',
    styleUrls: ['./system-radio.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SystemRadioComponent),//SystemRadioComponent,
            multi: true,
        },
       {provide: NG_VALIDATORS, useValue: Validators.nullValidator, multi: true}
    ]
})
export class SystemRadioComponent extends BaseComponent<any> implements OnInit, OnChanges {

    @Input() label: string = '';
    public elementId: string =
    (this.label === '') ? Math.random().toString(36).substring(2, 9) : this.label.replace(' ', '');
    @Input() text: string = '';
    @Input() labelClass = 'col-md-5';
    @Input() inputClass = 'col-md-7';
    @Input() placeholder: string = '--Please select--';
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
  
    get name(): string { return this.elementId; }
    set name(value: string) {
      this.elementId = value;
    }
  
    private innerValue!: string | number | boolean;
    override get value(): string | number | boolean {
      return this.innerValue;
    }


    public validate(c: FormControl) {
        return (this.errorsExist == null) ? null : this.errorsExist;
    }

    @Input() inline: boolean = true;

    @Input() options:Array<{key: any, value: any, selected?: boolean}> = [];

    constructor()
    {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
    }
    ngOnInit(): void {
    }

    override set value(v: string | number | boolean) {
        if (v !== this.innerValue) {
          this.innerValue = v;
          this.change(v);
        }
      }
    
      onChange!: Function;
      onTouched!: Function;
    
      override writeValue(value: string | number | boolean) {
        if (value !== this.innerValue) {
          this.innerValue = value;
        }
      }
    
      override registerOnChange(fn: Function): void {
        this.onChange = fn;
      }
    
      override registerOnTouched(fn: Function): void {
        this.onTouched = fn;
      }
    
      change(value: string | number | boolean) {
        this.innerValue = value;
        this.onChange(value);
        this.onTouched(value);
      }
}
