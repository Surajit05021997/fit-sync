import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.supabaseUrl,
      environment.supabase.supabaseKey
    );
  }

  insertUser(user: {
    uid: string;
    name: string;
    email: string;
    registration_complete: boolean;
  }) {
    return this.supabase.from('users').insert([user]);
  }

  updateUser(uid: string, registrationComplete: boolean) {
    return this.supabase
      .from('users')
      .update({ registration_complete: registrationComplete })
      .eq('uid', uid);
  }

  insertUserRegistrationDetails(userRegistrationDetails: any) {
    console.log(userRegistrationDetails);
    return this.supabase
      .from('user_registration')
      .insert([userRegistrationDetails]);
  }

  getUserById(uid: string) {
    return this.supabase.from('users').select('*').eq('uid', uid).limit(1);
  }

  getRegistrationDetailsById(uid: string) {
    return this.supabase
      .from('user_registration')
      .select('*')
      .eq('uid', uid)
      .limit(1);
  }

  async isExistingUser(uid: string): Promise<boolean> {
    const { data: existingUser, error: getUserByIdError } =
      await this.getUserById(uid);

    if (existingUser && existingUser.length !== 0) {
      return true;
    } else if (!existingUser || existingUser.length === 0) {
      return false;
    } else if (getUserByIdError) {
      throw getUserByIdError;
    }

    return false;
  }

  async isUserRegistrationAlreadyCompleted(uid: string): Promise<boolean> {
    const { data, error } = await this.getRegistrationDetailsById(uid);
    if (error) {
      throw error;
    }
    if (data && data.length > 0) {
      const user = data[0];
      return !!user.registration_complete;
    }
    return false;
  }
}
