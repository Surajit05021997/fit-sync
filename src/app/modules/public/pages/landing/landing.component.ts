import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  phoneNumber: number | null = null;
  otpCode: number | null = null;
  otpSent: boolean = false;

  signInWithGoogle() {

  }

  sendOTP() {

  }

  verifyOTP() {
    
  }
}
