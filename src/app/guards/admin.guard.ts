import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { PermissionService } from "src/app/_core";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    constructor(
      private _router: Router,
      private permissionService: PermissionService
      ) { }


async canActivate(): Promise<boolean>{
  const isAdmin = await this.permissionService.hasPermission('ADMIN');
  if(isAdmin)
  {
    return true;
  }
  return false;
  }
}