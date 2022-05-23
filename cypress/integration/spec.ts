describe('Some Test', () => {
    it('Adds document to test_hello_world collection of Firestore', () => {
        cy.login();
        cy.visit('');
        cy.callFirestore('add', 'test_hello_world', { some: 'value' });
    });
});
