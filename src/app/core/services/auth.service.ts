import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { SupabaseService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private supabaseService: SupabaseService
  ) {}

  async signInWithGoogle() {
    try {
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
    }
  }
}
