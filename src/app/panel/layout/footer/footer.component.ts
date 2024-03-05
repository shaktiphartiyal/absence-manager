import { Component, OnInit } from '@angular/core';
import { SystemPopupService } from 'src/app/_core';
import { AppConfig } from 'src/app/_core/services/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  appName = '';
  year: string | number = '';

  constructor(private config: AppConfig,
    private popup: SystemPopupService) { }

  ngOnInit() {
    this.appName = this.config.config('appName');
    const date = new Date();
    this.year = date.getFullYear();
  }


  openAboutPopup()
  {
    this.popup.open(`Designed and devleoped by Shakti Phartiyal: <a href="https://github.com/shaktiphartiyal" target="_blank">Github</a>`, 'About', true, 'Ok').then((result:any) => {
    });
  }

}
