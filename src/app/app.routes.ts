import {Routes} from '@angular/router';
import {PlayMat} from './play-mat/play-mat';
import {InitialSettings} from './initial-settings/initial-settings';

export const routes: Routes = [{path: 'play', component: PlayMat}, {path: '**', component: InitialSettings}];
