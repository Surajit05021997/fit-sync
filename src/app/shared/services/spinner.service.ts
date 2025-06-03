import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private spinnerSubject = new BehaviorSubject<{
    visible: boolean;
    spinnerText?: string;
  }>({ visible: false });

  spinner$: Observable<{ visible: boolean; spinnerText?: string }> =
    this.spinnerSubject.asObservable();

  showSpinner(spinnerText?: string) {
    this.spinnerSubject.next({ visible: true, spinnerText: spinnerText });
  }

  hideSpinner() {
    this.spinnerSubject.next({ visible: false, spinnerText: '' });
  }
}
