import { FilterByKeywordsPipe } from './filter-by-keywords.pipe';

describe('FilterByKeywordsPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterByKeywordsPipe();
        expect(pipe).toBeTruthy();
    });
});
