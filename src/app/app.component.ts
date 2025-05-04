import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fit-sync';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getLoggedInUserFromFirebase();
  }
}
