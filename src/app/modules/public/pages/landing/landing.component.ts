import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  phoneNumber: number | null = null;
  otpCode: number | null = null;
  otpSent: boolean = false;

  constructor(private afAuth: AngularFireAuth) {}

  // // 🔹 Google Sign-In
  signInWithGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log('Google sign-in success:', result.user);
        // Optionally redirect or store user info
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }

  // signInWithGoogle() {}

  sendOTP() {}

  verifyOTP() {}
}
