import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from './../../core/services/utils.service';
import { Quote } from '../models/quotes.model';

@Pipe({
    name: 'filterQuotesByKeywords',
})
export class FilterQuotesByKeywordsPipe implements PipeTransform {
    constructor(public utilsService: UtilsService) {}

    transform(quotes: Quote[], searchTextArr: string[]): Quote[] {
        // return empty array if array is falsy
        if (!quotes) {
            return [];
        }

        // return the original array if search text is empty
        if (!searchTextArr || searchTextArr.length === 0) {
            return quotes;
        }

        return quotes.filter((quote: Quote) => {
            if (quote && quote.content) {
                const quoteContent = quote.content.toLowerCase();
                const quoteAuthor = quote.author ? quote.author.toLowerCase() : 'anonymous';
                return (
                    searchTextArr.some((substring: string) => quoteContent.includes(substring)) ||
                    searchTextArr.some((substring: string) => quoteAuthor.includes(substring))
                );
            }
            return false;
        });
    }
}
