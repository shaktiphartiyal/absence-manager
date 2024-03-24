import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AppConfig, CacheService, ToastService } from '../_core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{

  passwordsMatch = true;

  private rc: string|null = null;
  error = '';
  hashVerified = false;
  hashValid = false;
  private _loading = false;
  model = {
    newPassword: '',
    repeatPassword: '',
  };

  constructor(
    private config: AppConfig,
    private api: ApiService,
    private cache: CacheService,
    private toaster: ToastService,
    private router: Router,
    private route: ActivatedRoute
  )
  {

  }

  get appName()
  {
    return this.config.config('appName');
  }

  get loading(): boolean
  {
    return this._loading;
  }

  set loading(value: boolean)
  {
    this._loading = value;
  }

  ngOnInit(): void {
    this.rc = this.route.snapshot.queryParamMap.get('rc');
    if(!this.rc)
    {
      this.hashVerified = true;
      this.hashValid = false;
    }
    else
    {
      this.verifyHash();
    }
  }

  private verifyHash()
  {
    this.loading = true;
    this.api.post('/auth/verify-reset-password-rc', {rc: this.rc}, false).subscribe({
      next: (res:any) => {
        this.hashVerified = true;
        this.hashValid = true;
      },
      error: (e) => {
        this.toaster.error(e.message);
        this.hashVerified = true;
        this.hashValid = false;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  matchPasswords()
  {
    if(this.model.newPassword == this.model.repeatPassword)
    {
      this.passwordsMatch = true;
    }
    else
    {
      this.passwordsMatch = false;
    }
  }

  resetPassword()
  {
    this.loading = true;
    this.api.post('/auth/reset-password', {
      rc: this.rc,
      newPassword: this.model.newPassword,
      repeatPassword: this.model.repeatPassword
    }, false).subscribe({
      next: (res:any) => {
        this.toaster.success(res.message);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 500);
      },
      error: (e) => {
        this.toaster.error(e.message);
        this.loading = false;
      }
    });
  }
}
