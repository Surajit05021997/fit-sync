import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
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
    private spinnerService: SpinnerService
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
