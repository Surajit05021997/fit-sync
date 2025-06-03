import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared/services';

@Component({
  selector: 'app-fs-spinner',
  templateUrl: 'fs-spinner.component.html',
  styleUrls: ['fs-spinner.component.scss'],
})
export class FsSpinnerComponent implements OnInit {
  showSpinner: boolean = false;
  spinnerText: string = '';

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.spinner$.subscribe(({ visible, spinnerText }) => {
      this.showSpinner = visible;
      this.spinnerText = spinnerText || '';
    });
  }
}
