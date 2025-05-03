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
          try {
            const { data: existingUser, error: getUserByIdError } =
              await this.supabaseService.getUserById(user.uid);

            // Store in Supabase if user does not exist in supabase
            if (!existingUser || existingUser.length === 0) {
              const { error: insertUserError } =
                await this.supabaseService.insertUser({
                  uid: user.uid,
                  name: user.displayName ?? '',
                  email: user.email ?? '',
                });

              if (insertUserError) {
                throw insertUserError;
              }
            } else if (getUserByIdError) {
              throw getUserByIdError;
            }
          } catch (error) {
            console.log('Something went wrong with supabase!', error);
          }
          this.router.navigate(['/dashboard']);
        }
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }

  sendOTP() {}

  verifyOTP() {}
}
