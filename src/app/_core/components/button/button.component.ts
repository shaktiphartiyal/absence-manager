import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {NgForm} from "@angular/forms";
import {BaseComponent} from '../base/BaseComponent';

@Component({
  selector: 'system-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends BaseComponent<any> implements OnInit {
  @Output() buttonEvent: EventEmitter<any> = new EventEmitter();
  @Input() type:any = 'button';
  @Input() formRef!: NgForm;
  public disabled: boolean = false;
  constructor() {
    super();
  }

  ngOnInit() {
  }

  onButtonClick(e:any) {
    if(this.type == 'submit')
    {
      this.formRef.ngSubmit.emit();
    }
    else
    {
        this.buttonEvent.emit(e);
    }
  }
}
