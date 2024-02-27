import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicComponents]'
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}