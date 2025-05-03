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

  insertUser(user: { uid: string; name: string; email: string }) {
    return this.supabase.from('users').upsert([user], { onConflict: 'id' });
  }

  getUserById(uid: string) {
    return this.supabase.from('users').select('*').eq('uid', uid).limit(1);
  }
}
