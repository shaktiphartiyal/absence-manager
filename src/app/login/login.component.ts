import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../_core/services/app.config';
import { NgForm } from '@angular/forms';
import { ApiService } from '../_core/services/api.service';
import { Router } from '@angular/router';
import { BaseUtilsComponent } from '../_core/components/base/BaseUtilsComponent';
import { CacheService } from '../_core/services/cache.service';
import { ToastService } from '../_core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseUtilsComponent implements OnInit {
  
  error = '';

  model = {
    email: '',
    password: ''
  }

  constructor(
    private config: AppConfig,
    private api: ApiService,
    private cache: CacheService,
    private toaster: ToastService,
    private router: Router)
  {
    super();
  }

  override ngOnInit(): void {
    if(!!this.cache.get('token'))
    {
      this.router.navigate(['panel']);
    }
  }

  get appName()
  {
    return this.config.config('appName');
  }

  login(formRef: NgForm)
  {
    this.loading();
    this.error = '';
    this.api.post('/auth/login', this.model, false).subscribe({
      next: (res:any) => {
        const token = res.data.token;
        const permissions = res.data.permissions;
        let name = res.data?.name;
        if(!name)
        {
          name = '-';
        }
        this.cache.set('nameofuser', name);
        this.cache.set('token', token);
        this.cache.set('permissions', permissions);
        this.router.navigate(['panel']);
      },
      error: (e) => {
        this.loading(false);
        this.toaster.error(e.message);
      },
      complete: () => {
        this.loading(false);
      } 
    });
  }
}
