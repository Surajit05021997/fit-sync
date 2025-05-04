import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private spinnerSubject = new BehaviorSubject<boolean>(false);

  spinner$: Observable<boolean> = this.spinnerSubject.asObservable();

  showSpinner() {
    this.spinnerSubject.next(true);
  }

  hideSpinner() {
    this.spinnerSubject.next(false);
  }
}
