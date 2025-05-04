import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fs-input',
  templateUrl: './fs-input.component.html',
  styleUrls: ['./fs-input.component.scss'],
})
export class FsInputComponent {
  @Input() name: string = '';
  @Input() placeholder: string = '';
}
