import { NgModule } from '@angular/core';
import {
  FsButtonComponent,
  FsInputComponent,
  FsSpinnerComponent,
} from './components';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FsButtonComponent, FsInputComponent, FsSpinnerComponent],
  imports: [CommonModule],
  exports: [FsButtonComponent, FsInputComponent, FsSpinnerComponent],
})
export class SharedModule {}
