describe('Suggested quote flow', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });

    it('Should add a suggested quote', () => {
        //checks if the suggested quote is visible
        cy.get('[data-cy="suggested-quote-banner"]').first().should('be.visible');

        //gets the quote content and author
        cy.get('[data-cy="suggested-quote-content"]')
            .invoke('text')
            .then((text: string) => {
                cy.wrap(text.trim()).as('suggestedQuoteContent');
            });

        cy.get('[data-cy="suggested-quote-author"]')
            .invoke('text')
            .then((text: string) => {
                cy.wrap(text.trim()).as('suggestedQuoteAuthor');
            });

        //save the quote
        cy.get('[data-cy="suggested-quote-save-button"]').first().click();

        cy.wait(500);

        //compare suggested quote text to the new quote
        cy.get('@suggestedQuoteContent').then((quote: JQuery<HTMLElement>) => {
            cy.get('[data-cy="quote-content"]').first().should('have.text', quote);
        });

        cy.get('@suggestedQuoteAuthor').then((author: JQuery<HTMLElement>) => {
            cy.get('[data-cy="quote-author"]')
                .first()
                .should('have.text', `- ${author ? author : 'Anonymous'}`);
        });
    });

    it('Should dismiss a suggested quote', () => {
        //checks if the suggested quote is visible
        cy.get('[data-cy="suggested-quote-banner"]').first().should('be.visible');

        //dismiss the quote
        cy.get('[data-cy="suggested-quote-dismiss-button"]').first().click();

        ///checks if the suggested quote is not visible
        cy.get('[data-cy="suggested-quote-banner"]').first().should('not.be.visible');
    });
});
