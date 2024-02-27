import { Injectable } from '@angular/core';
import {AppConfig} from './app.config';

@Injectable()
export class AuthService {

  constructor(
      private config:AppConfig
  ) { }

  public get authToken(): string
  {
      let token:any = null;
      let store = this.config.config('tokenStore');
      if(store.toLowerCase() == 'localstorage')
      {
          token = localStorage.getItem('token');
      }
      else
      {
          token = sessionStorage.getItem('token');
      }
      return token;
  }

  public get isAuthenticated(): boolean
  {
      if(!this.authToken)
      {
          return false;
      }
      return true;
  }
}
