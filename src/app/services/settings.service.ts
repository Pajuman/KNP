import {Injectable} from '@angular/core';
import {Speed} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public cardsRange: 'default' | 'extended' = 'extended';
  public mode: 'tutorial' | 'advanced' | 'expert' = 'tutorial';
  public speed: Speed = Speed.fast;
}
