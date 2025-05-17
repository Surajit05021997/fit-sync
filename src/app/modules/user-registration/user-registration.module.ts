import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRegistrationComponent } from 'src/app/modules/user-registration/pages';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [SharedModule, FormsModule],
  exports: [],
})
export class UserRegistrationModule {}
