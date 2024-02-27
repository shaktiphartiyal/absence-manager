import { Component, ViewChild } from '@angular/core';
import { SystemPopupComponent } from './_core/components/system-popup/system-popup.component';
import { SystemPopupService } from './_core/components/system-popup/system-popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild('popUp', {static: false}) popUp!: SystemPopupComponent;

  constructor(
    private systemPopupService: SystemPopupService
  )
  {
    // this.systemPopupService.popUp = this.popUp;
  }
  
}
