import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { SupabaseService } from 'src/app/core/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  phoneNumber: number | null = null;
  otpCode: number | null = null;
  otpSent: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  // Google Sign-In
  signInWithGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (result) => {
        console.log('Google sign-in success:', result.user);
        const user = result.user;

        if (user) {
          // Store in Supabase
          await this.supabaseService.insertUser({
            id: user.uid,
            name: user.displayName ?? '',
            email: user.email ?? '',
          });
        }

        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }

  sendOTP() {}

  verifyOTP() {}
}
