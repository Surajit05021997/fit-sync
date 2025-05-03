import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, tap } from 'rxjs/operators';

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
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    // Check if user is logged in or not. If logged in then redirect user to dashboard page.
    const obs = this.afAuth.authState.pipe(map((user) => !!user));
    obs.subscribe((isUserLoggedIn) => {
      if (isUserLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
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
