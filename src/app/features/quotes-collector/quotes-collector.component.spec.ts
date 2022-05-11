import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesCollectorComponent } from './quotes-collector.component';

describe('QuotesCollectorComponent', () => {
    let component: QuotesCollectorComponent;
    let fixture: ComponentFixture<QuotesCollectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuotesCollectorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuotesCollectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
