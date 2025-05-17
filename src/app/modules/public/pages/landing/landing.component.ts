import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, SupabaseService } from 'src/app/core/services';
import { SpinnerService } from 'src/app/shared/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  phoneNumber: number | null = null;
  otpCode: number | null = null;
  otpSent: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit() {
    // Check if user is logged in or not. If logged in then redirect user to dashboard page.
    this.spinnerService.showSpinner();
    this.authService.user$.subscribe(async (user) => {
      if (user) {
        const isUserRegistrationAlreadyCompleted =
          await this.supabaseService.isUserRegistrationAlreadyCompleted(
            user.uid
          );
        if (isUserRegistrationAlreadyCompleted) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/user-registration']);
        }
      }
      this.spinnerService.hideSpinner();
    });
  }

  // Google Sign-In
  async signInWithGoogle() {
    await this.authService.signInWithGoogle();
  }

  sendOTP() {}

  verifyOTP() {}
}
