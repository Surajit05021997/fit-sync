import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  phoneNumber: number | null = null;
  otpCode: number | null = null;
  otpSent: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

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
