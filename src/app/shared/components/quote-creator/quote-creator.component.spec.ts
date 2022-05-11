import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCreatorComponent } from './quote-creator.component';

describe('QuoteCreatorComponent', () => {
    let component: QuoteCreatorComponent;
    let fixture: ComponentFixture<QuoteCreatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuoteCreatorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteCreatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
