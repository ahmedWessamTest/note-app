import { Component, input, Input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  imports: [],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent {
  // @Input({ required: true }) text!: string;
  text: InputSignal<string> = input.required();
}
