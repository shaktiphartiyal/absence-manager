import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

    constructor(private Sanitizer: DomSanitizer) {

    }

    transform(V: string): SafeHtml {
        return this.Sanitizer.bypassSecurityTrustHtml(V);
    }
}