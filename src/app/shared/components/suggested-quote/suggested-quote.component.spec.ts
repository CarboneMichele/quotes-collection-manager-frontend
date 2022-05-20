import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedQuoteComponent } from './suggested-quote.component';

describe('SuggestedQuoteComponent', () => {
    let component: SuggestedQuoteComponent;
    let fixture: ComponentFixture<SuggestedQuoteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SuggestedQuoteComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SuggestedQuoteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
