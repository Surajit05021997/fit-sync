import { NgModule } from '@angular/core';
import {
  FsButtonComponent,
  FsInputComponent,
  FsSpinnerComponent,
  FsRadioComponent,
} from './components';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FsButtonComponent,
    FsInputComponent,
    FsSpinnerComponent,
    FsRadioComponent,
  ],
  imports: [CommonModule],
  exports: [
    FsButtonComponent,
    FsInputComponent,
    FsSpinnerComponent,
    FsRadioComponent,
  ],
})
export class SharedModule {}
