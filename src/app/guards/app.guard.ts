import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { CacheService } from "src/app/_core";

@Injectable({
    providedIn: 'root'
})
export class AppGuard {
    constructor(private _router: Router, private cache: CacheService) { }


canActivate(): boolean{
    if (this.cache.get('token'))
    {
      return true;
    }
    this.cache.clearAll();
    this._router.navigate(['login']);
    return false;
  }
}