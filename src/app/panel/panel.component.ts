import { Component, OnInit } from '@angular/core';
import { ApiService, PermissionService } from '../_core';
import { IMenuItems } from './layout/left-sidebar/left-sidebar.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  public menuItems: Array<IMenuItems> = [
    // {
    //   title: 'Available Leaves',
    //   routerLink: "/panel/leaves/available-leaves",
    //   icon: 'fas fa-tachometer-alt'
    // },
    {
      title: 'Manage Leaves',
      routerLink: "/panel/leaves/manage-leaves",
      icon: 'fas fa-question-circle',
      name: 'manage-leaves'
    },
    {
      title: 'Team Calendar',
      routerLink: '/panel/leaves/team-calendar',
      icon: 'fas fa-user-friends',
      name: 'team-calendar'
    }
  ];


  constructor(
    private api: ApiService,
    private permissionService: PermissionService
  )
  {

  }

  async ngOnInit(): Promise<void> {
    document.body.classList.add('sb-nav-fixed');
    const isAdmin = await this.permissionService.hasPermission('ADMIN');
    if(isAdmin)
    {
      this.menuItems.push(
        {
        title: 'Admin',
        routerLink: '#',
        icon:'fas fa-balance-scale',
        name: 'admin',
        children: [
          {
            title: 'Leave approval',
            routerLink: '/panel/admin/leave-approval',
            icon: 'fas fa-marker',
            name: 'admin-leave-approval',
            parentName: 'admin'
          },
          {
            title: 'Team management',
            routerLink: '/panel/admin/team-management',
            icon: 'fas fa-magic',
            name: 'admin-team-management',
            parentName: 'admin'
          },        
          {
            title: 'User management',
            routerLink: '/panel/admin/user-management',
            icon: 'fas fa-users',
            name: 'admin-user-management',
            parentName: 'admin'
          },        
        ]
      });
    }
  }


}
