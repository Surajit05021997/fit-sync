import { Component, OnInit } from '@angular/core';
import { SupabaseService, AuthService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  user: firebase.User | null = null;
  isExistingUser: boolean = false;
  userName: string = '';
  userAge: number | null = null;
  userWeight: number | null = null;
  userHeight: number | null = null;
  userGoal: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.spinnerService.showSpinner();
    this.authService.user$.subscribe(async (user) => {
      // chk if uid is present, if yes that means user registration is completed
      if (user) {
        this.user = user;
        try {
          const isUserRegistrationAlreadyCompleted =
            await this.supabaseService.isUserRegistrationAlreadyCompleted(
              user.uid
            );
          if (isUserRegistrationAlreadyCompleted) {
            this.router.navigate(['./dashboard']);
          }
        } catch (error) {
          console.error('Some thing went wrong', error);
        } finally {
          this.spinnerService.hideSpinner();
        }
      }
    });
  }

  async registerUser() {
    try {
      this.spinnerService.showSpinner();

      if (this.user) {
        // store user details in supabase user table
        const { error: insertUserError } =
          await this.supabaseService.insertUser({
            uid: this.user.uid,
            name: this.user.displayName ?? '',
            email: this.user.email ?? '',
            registration_complete: false,
          });
        if (insertUserError) {
          throw insertUserError;
        }

        // store user registration details in supabase registration table
        const { error: insertUserRegistrationDetailsError } =
          await this.supabaseService.insertUserRegistrationDetails({
            uid: this.user.uid,
            name: this.userName,
            age: this.userAge,
            height: this.userHeight,
            weight: this.userWeight,
            goal: this.userGoal,
          });
        if (insertUserRegistrationDetailsError) {
          throw insertUserRegistrationDetailsError;
        }

        // update user table with registration_complete to true
        await this.supabaseService.updateUser(this.user.uid, true);

        this.router.navigate(['./dashboard']);
      }
    } catch (error) {
      console.error('Something went wrong!', error);
    } finally {
      this.spinnerService.hideSpinner();
    }
  }
}
