import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  user$ = this.authService.user$;
  userDetails: firebase.User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userDetails = user;
    });
  }
}
