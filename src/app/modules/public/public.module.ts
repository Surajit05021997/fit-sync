import { NgModule } from '@angular/core';
import { LandingComponent } from './pages';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    LandingComponent
  ],
})
export class PublicModule {}
