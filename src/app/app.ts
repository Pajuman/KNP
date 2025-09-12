import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PlayMat} from './play-mat/play-mat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlayMat],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
