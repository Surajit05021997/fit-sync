import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;
  userDetails: firebase.User | null = null;
  hideProfileMenu: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userDetails = user;
    });
  }

  useFallbackUserProfilePhoto(event: Event) {
    (event.target as HTMLImageElement).src = './assets/icons/user.svg';
  }

  toggleProfileMenu() {
    this.hideProfileMenu = !this.hideProfileMenu;
  }
}
