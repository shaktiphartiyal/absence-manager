import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userSettingsOpened:boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggleLeftSideBar()
  {
    document.body.classList.contains("sb-sidenav-toggled")?document.body.classList.remove('sb-sidenav-toggled'):document.body.classList.add('sb-sidenav-toggled');
  }


  toggleUserMenu()
  {
    this.userSettingsOpened = !this.userSettingsOpened;
  }


  logout()
  {
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/login']);
    });
  }

}
