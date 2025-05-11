import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ProfileMenuComponent } from './components';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HeaderComponent, ProfileMenuComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
