import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material Form Controls
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// Material Navigation
// Material Layout
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Material Popups & Modals
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Material Data tables

@NgModule({
    declarations: [],
    imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatListModule],
    exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatListModule],
})
export class MaterialModule {}
