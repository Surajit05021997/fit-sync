import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services';
import { SpinnerService } from 'src/app/shared/services';

import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    // Check if user is logged in or not. If logged in then redirect user to dashboard page.
    this.spinnerService.showSpinner();
    const obs = this.authService.getLoggedInUser();
    obs.subscribe((user) => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
      this.spinnerService.hideSpinner();
    });
  }

  // Google Sign-In
  async signInWithGoogle() {
    const user = await this.authService.signInWithGoogle();
    if (user) {
      this.router.navigate(['/dashboard']);
    }
  }

  sendOTP() {}

  verifyOTP() {}
}
