import { NgModule } from '@angular/core';
import { fsButtonComponent, fsInputComponent } from './components';

@NgModule({
  declarations: [fsButtonComponent, fsInputComponent],
  exports: [fsButtonComponent, fsInputComponent],
})
export class SharedModule {}
