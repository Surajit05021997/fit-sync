import { NgModule } from '@angular/core';
import { LandingComponent } from './pages';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    LandingComponent
  ],
})
export class PublicModule {}
