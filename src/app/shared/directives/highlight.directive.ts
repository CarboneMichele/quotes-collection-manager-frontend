/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, HostBinding, Input, OnChanges, SecurityContext, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
    selector: '[qcm-highlight]',
})
export class HighlightDirective implements OnChanges {
    @Input('qcm-highlight') searchTerms: string[] = [];
    @Input() customClasses = '';

    @HostBinding('innerHtml')
    content!: string;
    constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.el?.nativeElement) {
            if ('searchTerms' in changes) {
                const text = (this.el.nativeElement as HTMLElement).textContent;
                if (!this.searchTerms || this.searchTerms.length === 0) {
                    this.content = text || '';
                } else {
                    const regex = new RegExp(this.searchTerms.join('|'), 'gi');
                    const newText = text?.replace(regex, (match: string) => {
                        return `<mark [data-cy="quote-mark"] class="qcm-highlight">${match}</mark>`;
                    });
                    const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, newText || '');
                    this.content = sanitized || '';
                }
            }
        }
    }
}
