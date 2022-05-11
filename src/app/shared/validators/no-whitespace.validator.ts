import { AbstractControl } from '@angular/forms';

export const NoWhitespaceValidator = (control: AbstractControl): null | Record<string, boolean> => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
};
