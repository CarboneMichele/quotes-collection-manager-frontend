describe('New quote creation', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });

    it('Should add a new quote', () => {
        //clicks the button and checks that the form is showing
        cy.get('[data-cy="open-creator-button"]').first().click();
        cy.get('[data-cy="quote-creator"].-show').first().should('be.visible');

        //fills the form with a random string and submits it
        const quoteContent = generateRandomString(20);
        cy.get('[data-cy="quote-content-field"]').first().type(quoteContent);
        cy.get('[data-cy="quote-author-field"]').first().type('test author content');
        cy.get('[data-cy="quote-submit-button"]').first().click();

        //check if the first quote in the list is the new one
        cy.wait(200);
        cy.get('[data-cy="quote-content"]').first().should('have.text', quoteContent);

        //check if form is not showing
        cy.get('[data-cy="quote-creator"].-show').should('not.exist');
    });
});

function generateRandomString(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
