import { UtilsService } from './../../core/services/utils.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterByKeywords',
})
export class FilterByKeywordsPipe implements PipeTransform {
    constructor(public utilsService: UtilsService) {}

    transform(items: any[], searchText: string, fieldName: string): any[] {
        // return empty array if array is falsy
        if (!items) {
            return [];
        }

        // return the original array if search text is empty
        if (!searchText || searchText === ' ') {
            return items;
        }

        // convert the searchText to lower case
        searchText = searchText.toLowerCase();

        // retrun the filtered array
        // return items.filter((item: Quote) => {
        //     if (item && item[fieldName]) {
        //         return item[fieldName].toLowerCase().includes(searchText);
        //     }
        //     return false;
        // });
        return [];
    }
}
