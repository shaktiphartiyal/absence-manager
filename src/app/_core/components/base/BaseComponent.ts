import { Injectable, Output, Input, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm, NgModel} from '@angular/forms';
import { BaseValueAccessor } from './BaseValueAccessor';

export function BaseComponentProvider(type: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}


@Injectable()
export abstract class BaseComponent<T> extends BaseValueAccessor<T> {
    
    public errorsExist:any = {};
    public showErrorText:boolean = false;
}


