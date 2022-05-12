import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    constructor() {}

    //
    // ─── STRING MANIPULATION METHODS ────────────────────────────────────────────────
    //

    lowerCaseRemoveSpacesAndTrim(str: string): string {
        return str.trim().toLowerCase().replace(/\s/g, '');
    }

    getArrayOfOnlyAlphanumericStrings(str: string): string[] {
        const strSet = new Set<string>(
            str
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9 ]/gi, '')
                .split(' ')
                .filter((searchStr: string) => {
                    return searchStr !== '';
                })
        );
        return [...strSet];
    }
}
