import {Component, Input, OnInit, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'system-data-box',
    templateUrl: './data-box.component.html',
    styleUrls: ['./data-box.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DataBoxComponent implements OnInit
{
    @Input() public loading:boolean = false;
    @Input() public title!: String;
    @Input() public saveButton: boolean = false;
    @Input() public cancelButton: boolean = false;
    @Input() public addButton: boolean = false;
    @Input() public formRef!: NgForm;
    @Input() public disabled: boolean = false;
    @Input() public customButtons: Array<{
        show: boolean,
        disabled: boolean,
        clickEventId: string,
        buttonClass:string,
        showButtonIcon: boolean,
        buttonIconClass?: string,
        showButtonText: boolean,
        buttonText?: string
    }> = [];


    @Output() public onSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onCancel: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onAdd: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onCustomButtonClick: EventEmitter<any> = new EventEmitter<any>();

 
    constructor()
    {

    }

    ngOnInit()
    {

    }


    public emitCustomButtonEvent(eventId: string)
    {
        this.onCustomButtonClick.emit(eventId);
    }

    emitAddClick() {
        this.onAdd.emit();
    }

    emitSaveClick() {
        if(!!this.formRef)
        {
            (this.formRef as any).submitted = true;
            this.formRef.ngSubmit.emit();
        }
        else
        {
            this.onSave.emit();
        }
    }

    emitCancelClick() {
        this.onCancel.emit();
    }
}
