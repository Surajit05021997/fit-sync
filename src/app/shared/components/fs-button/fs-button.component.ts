import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-fs-button',
  templateUrl: './fs-button.component.html',
  styleUrls: ['./fs-button.component.scss'],
})
export class fsButtonComponent {
  @Input() buttonText: string = '';
}
