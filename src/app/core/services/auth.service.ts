import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';

import { SpinnerService } from 'src/app/shared/services';
import { SupabaseService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<firebase.User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private supabaseService: SupabaseService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  async signInWithGoogle() {
    try {
      this.spinnerService.showSpinner();
      const result = await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );

      console.log('Google sign-in success:', result.user);
      const user = result.user;

      if (user) {
        const isUserRegistrationAlreadyCompleted =
          await this.supabaseService.isUserRegistrationAlreadyCompleted(
            user.uid
          );
        const isExistingUser = await this.supabaseService.isExistingUser(
          user.uid
        );

        if (!isExistingUser && !isUserRegistrationAlreadyCompleted) {
          // store user details in supabase user table
          const { error: insertUserError } =
            await this.supabaseService.insertUser({
              uid: user.uid,
              name: user.displayName ?? '',
              email: user.email ?? '',
              registration_complete: false,
            });
          if (insertUserError) {
            throw insertUserError;
          }
          this.router.navigate(['/user-registration']);
        } else if (isExistingUser && !isUserRegistrationAlreadyCompleted) {
          this.router.navigate(['/user-registration']);
        } else {
          this.router.navigate(['./dashboard']);
        }
      }
      return user;
    } catch (error) {
      console.log('Something went wrong!', error);
      return null;
    } finally {
      this.spinnerService.hideSpinner();
    }
  }

  getLoggedInUserFromFirebase(): void {
    this.afAuth.authState.subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
