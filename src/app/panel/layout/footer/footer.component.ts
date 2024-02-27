import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/_core/services/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  appName = '';
  year: string | number = '';

  constructor(private config: AppConfig) { }

  ngOnInit() {
    this.appName = this.config.config('appName');
    const date = new Date();
    this.year = date.getFullYear();
  }

}
