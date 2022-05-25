describe('Search filter flow', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });

    it('Should filter quotes by keywords', () => {
        const keywords = ['one', 'two', 'three'];

        const regex = new RegExp(`(${keywords.join('|')})`, 'g');
        cy.get('[data-cy="quote"]').contains(regex, { matchCase: false }).its('length');
        cy.get('[data-cy="quote"]')
            .filter((index: number, el: HTMLElement) => {
                const content = el.querySelector('[data-cy="quote-content"]')?.innerHTML || '';
                const author = el.querySelector('[data-cy="quote-author"]')?.innerHTML || '';
                const contentMatches = content.match(regex) || [];
                const authorMatches = author.match(regex) || [];
                return contentMatches.length > 0 || authorMatches.length > 0;
            })
            .its('length')
            .then((length: number) => {
                cy.get('[data-cy="search-filter-input"]').first().type(keywords.join(' '));
                cy.get('[data-cy="quote"]').should('have.length', length);
            });
    });
});
