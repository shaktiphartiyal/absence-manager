import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, BaseDetailComponent, CacheService, ToastService } from 'src/app/_core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseDetailComponent {

  @ViewChild('upForm', { static: true }) upForm!: NgForm;

  public override pageTitle: string = 'User Profile';
  public errorMessage: string = '';
  private errorTimeout:any = null;
  public timeoutms = 5000;

  public currentPassword: string = '';
  public newPassword: string = '';
  public confirmNewPassword: string = '';

  public override model: any = {
    username: '',
    name: '',
    signum: ''
  };

  public buttonDisabled = false;

  constructor(
    api: ApiService,
    router: Router,
    activatedRoute: ActivatedRoute,
    private cache: CacheService,
    private toaster: ToastService,
  )
  {
    super(api, router, activatedRoute);
    this.setProps(undefined, 'Profile', undefined);
  }


  override ngOnInit() {
    this.loadUserProfile();
  }


  loadUserProfile()
  {
    this.loading();
    this.subscriptions['loadUserProfile'] = this.api.get(`/users/info`).subscribe({
      next: (response: any) => {
        this.model = {
          ...this.model,
          username: response.data.username,
          name: response.data.name,
          signum: response.data.signum
        }
      },
      error: (err: any) => {
        this.toaster.error(err.message);
        this.loading(false);
      },
      complete: () => {
        this.loading(false);
      }
    });
  }


  override onSave(): void {
    if(!!this.errorTimeout)
    {
      clearTimeout(this.errorTimeout);
    }
    this.errorMessage = '';
    if(this.newPassword === this.currentPassword)
    {
      this.errorMessage = 'New password cannot be the same as the current password!';
      this.setErrorTimeout();
      return;
    }
    if(this.newPassword !== this.confirmNewPassword)
    {
      this.errorMessage = 'New password and password confirmation do not match !';
      this.setErrorTimeout();
      return;
    }
    this.loading();
    this.buttonDisabled = true;
    this.subscriptions['changePassword'] = this.api.patch(`/users/profile/change-password`, {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmNewPassword
    }).subscribe({
      next: (response: any) => {
        this.toaster.success(response.message);
        this.buttonDisabled = false;
        (this.upForm as any).submitted = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
      },
      error: (err: any) => {
        this.toaster.success(err.message);
        this.loading(false);
        this.buttonDisabled = false;
      },
      complete: () => {
        this.loading(false);
      }
    });

  }

  private setErrorTimeout()
  {
    if(!!this.errorTimeout)
    {
      clearTimeout(this.errorTimeout);
    }
    this.errorTimeout = setTimeout(() => {
      this.errorMessage = '';
      clearTimeout(this.errorTimeout);
    }, this.timeoutms);
  }

}
