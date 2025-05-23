import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fs-button',
  templateUrl: './fs-button.component.html',
  styleUrls: ['./fs-button.component.scss'],
})
export class FsButtonComponent {
  @Input() buttonText: string = '';
  @Input() fullWidth: boolean = false;
}
