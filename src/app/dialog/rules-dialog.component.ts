import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-rules-dialog',
  imports: [],
  templateUrl: './rules-dialog.component.html',
  styleUrl: './rules-dialog.component.scss'
})
export class RulesDialog {
  public isOpened = signal(false);
}
