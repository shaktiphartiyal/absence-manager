import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { CacheService } from 'src/app/_core';

export interface IMenuItems
{
  title: string;
  routerLink: string;
  icon?: string;
  _collapsed?: boolean;
  children?: Array<IMenuItems>;
  name?: string;
  parentName? :string;
}

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  @Input() menuItems: Array<IMenuItems> = [];

  public currentRoute!: string;
  public nameOfUser : string = '';
  public currentRouteName: string = '';
  public currentParentName: string | undefined = undefined;

  constructor(
    private location: Location,
    private router: Router,
    private cache: CacheService,
    private route:ActivatedRoute
    )
    {
      router.events.subscribe((val: any) => {
        this.currentRoute = this.location.path(true);
        if(val instanceof ActivationEnd)
        {
          const nameData = val.snapshot.data['name'];
          const parentData = val.snapshot.data['parentName'];
          if(!!nameData)
          {
            this.currentParentName = parentData;
            if(this.currentRouteName.startsWith(nameData))
            {
              this.currentParentName = nameData;
            }
            else
            {
              this.currentRouteName = nameData;
            }
          }
        }
      });
    }

  ngOnInit() {
    this.currentRoute = this.location.path(true);
    const nameFromCache = this.cache.get('nameofuser');
    this.nameOfUser = !!nameFromCache ? nameFromCache : '-';
  }
}
