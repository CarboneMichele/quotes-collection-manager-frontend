import { UtilsService } from './../../core/services/utils.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function NoDuplicatesValidator(quotesContents: string[], utilsService: UtilsService): ValidatorFn {
    return (control: AbstractControl): Record<string, boolean> | null => {
        const quoteContent = utilsService.lowerCaseRemoveSpacesAndTrim(control.value || '');
        const isValid = !quotesContents.includes(quoteContent);
        return isValid ? null : { duplicates: true };
    };
}
