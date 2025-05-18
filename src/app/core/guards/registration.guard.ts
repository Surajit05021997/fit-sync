import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService, AuthService } from 'src/app/core/services';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegistrationGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.supabaseService.isUserRegistrationAlreadyCompleted(
            user.uid
          );
        }
        return [false];
      }),
      map((isCompleted) => !!isCompleted),
      tap((isCompleted) => {
        if (!isCompleted) {
          console.log('Access denied. Registration not completed.');
          this.router.navigate(['/user-registration']);
        }
      })
    );
  }
}
