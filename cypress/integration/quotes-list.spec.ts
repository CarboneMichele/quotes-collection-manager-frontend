describe('Quotes list visualization', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('');
    });

    it('Should show a list of saved quotes', () => {
        cy.get('[data-cy="quotes-list"]').first().should('be.visible');
    });
});
