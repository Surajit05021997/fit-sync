import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  user$ = this.authService.user$;
  userDetails: firebase.User | null = null;

  @Input() hidden: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userDetails = user;
    });
  }

  useFallbackUserProfilePhoto(event: Event) {
    (event.target as HTMLImageElement).src = './assets/icons/user.svg';
  }

  onLogout() {
    this.spinnerService.showSpinner();
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      })
      .finally(() => {
        this.hidden = true;
        this.spinnerService.hideSpinner();
      });
  }
}
