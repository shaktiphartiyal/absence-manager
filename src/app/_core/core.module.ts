import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { SystemTextboxComponent } from './components/system-textbox/system-textbox.component';
import { SystemTextareaComponent } from "./components/system-textarea/system-textarea.component";
import { SystemCheckboxComponent } from "./components/system-checkbox/system-checkbox.component";
import { SystemRadioComponent } from "./components/system-radio/system-radio.component";
import { CacheService } from "./services/cache.service";
import { PermissionService } from "./services/permission.service";
import { ApiService } from "./services/api.service";
import { AuthService } from "./services/auth.service";
import { AppConfig } from "./services/app.config";
import { ToastService } from "./services/toast.service";
import { DataBoxComponent } from "./components/data-box/data-box.component";
import { GridComponent } from "./components/grid/grid.component";
import { ButtonComponent } from "./components/button/button.component";
import { SystemLoaderComponent } from "./components/system-loader/system-loader.component";
import { SystemPopupContainerComponent } from "./components/system-popup-container/system-popup-container.component";
import { DateFormatPipe } from "./pipes/date-format.pipe";
import { LimitLengthPipe } from "./pipes/limit-length.pipe";
import { SanitizeHtmlPipe } from "./pipes/sanitize-html.pipe";
import { DynamicComponentDirective } from "./directives/dynamic-component.directive";
import { SystemPopupComponent } from "./components/system-popup/system-popup.component";
import { SystemDropdownListComponent } from "./components/system-dropdown-list/system-dropdown-list.component";
import { SystemDatePickerComponent } from "./components/system-date-picker/system-date-picker.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { SocketService } from "./services/socket.service";


@NgModule({
  declarations: [
    SystemTextboxComponent,
    SystemTextareaComponent,
    SystemCheckboxComponent,
    SystemRadioComponent,
    SystemDropdownListComponent,
    SystemDatePickerComponent,


    DataBoxComponent,
    GridComponent,
    ButtonComponent,
    SystemLoaderComponent,
    SystemPopupContainerComponent,
    SystemPopupComponent,

    DateFormatPipe,
    LimitLengthPipe,
    SanitizeHtmlPipe,
    DynamicComponentDirective,

  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AppConfig,
    ToastService,
    CacheService,
    ApiService,
    AuthService,
    SocketService,
    PermissionService
  ],
  exports: [
    SystemTextboxComponent,
    SystemTextareaComponent,
    SystemCheckboxComponent,
    SystemRadioComponent,
    SystemDropdownListComponent,
    SystemDatePickerComponent,

    

    DataBoxComponent,
    GridComponent,
    ButtonComponent,
    SystemLoaderComponent,
    SystemPopupContainerComponent,
    SystemPopupComponent,

    DateFormatPipe,
    LimitLengthPipe,
    SanitizeHtmlPipe,
    DynamicComponentDirective,

  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AppConfig,
        ToastService,
        CacheService,
        ApiService,
        AuthService,
      ],
    };
  }
}
