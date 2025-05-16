import { NgModule } from '@angular/core';
import { DashboardHomeComponent } from './pages';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [SharedModule],
  exports: [DashboardHomeComponent],
})
export class DashboardModule {}
