describe('Clipboard actions', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });

    it('Should copy the quote content to the clipboard and format it', () => {
        cy.get('[data-cy="quote"]').first().click();
        cy.get('[data-cy="copy-to-clipboard-button"]').first().click();
        cy.wait(2000);
        cy.get('[data-cy="search-filter-input"]').first().type('{ctrl+v}', { force: true });
        cy.get('[data-cy="quote"]')
            .first()
            .then((el: JQuery<HTMLElement>) => {
                const content = el.find('[data-cy="quote-content"]')[0].innerHTML || '';
                const author = el.find('[data-cy="quote-author"]')[0].innerHTML || '';
                const formattedQuoteContent = `${formatQuoteContent(content)}\r\n(${author.replace('- ', '')})`;
                cy.window().then((win: Cypress.AUTWindow) => {
                    console.log(win.isSecureContext);
                    win.navigator.clipboard.readText().then((textInTheClipboard: string) => {
                        expect(textInTheClipboard).to.eq(formattedQuoteContent);
                    });
                });
            });
    });
});

function formatQuoteContent(quoteContent: string): string {
    const capitalizedQuote = quoteContent.charAt(0).toUpperCase() + quoteContent.slice(1);
    return capitalizedQuote.endsWith('.') ? capitalizedQuote : capitalizedQuote + '.';
}
