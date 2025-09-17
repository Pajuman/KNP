import {Routes} from '@angular/router';
import {PlayMat} from './play-mat/play-mat';
import {InitialSettings} from './initial-settings/initial-settings.component';
import {Evaluation} from './evaluation/evaluation.component';

export const routes: Routes = [{path: 'play', component: PlayMat}, {
  path: 'evaluation',
  component: Evaluation
}, {
  path: '**',
  component: InitialSettings
}];
