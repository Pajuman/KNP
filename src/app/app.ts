import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {InitialSettings} from './initial-settings/initial-settings';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InitialSettings],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
