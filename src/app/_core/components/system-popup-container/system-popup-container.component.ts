import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'system-popup-container',
  templateUrl: './system-popup-container.component.html',
  styleUrls: ['./system-popup-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SystemPopupContainerComponent implements OnInit
{
  @Output() public onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onCancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onCustomButtonClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() public editMode:boolean = false;
  @Input() public width:any;
  @Input() public saveButton: boolean = false;
  @Input() public cancelButton: boolean = true;
  @Input() public addButton: boolean = false;
  @Input() public formRef!: NgForm;
  @Input() public disabled:boolean = false;
  @Input() public loading:boolean = false;
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

  @ViewChild('popupComponent', {static: false}) popupComponent!: SystemPopupContainerComponent;
  @Input() title: any;

  constructor() {

  }

  ngOnInit() {
  }

  emitCancelClick()
  {
    this.onCancel.emit();
  }

  emitAddClick() {
    this.onAdd.emit();
  }

  public emitCustomButtonEvent(eventId: string)
  {
      this.onCustomButtonClick.emit(eventId);
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

}