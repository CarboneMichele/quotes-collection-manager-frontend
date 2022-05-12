import { FilterQuotesByKeywordsPipe } from './filter-quotes-by-keywords.pipe';

describe('FilterQuotesByKeywordsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterQuotesByKeywordsPipe();
    expect(pipe).toBeTruthy();
  });
});
