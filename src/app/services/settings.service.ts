import {Injectable} from '@angular/core';
import {Speed} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public thingsRange: 'default' | 'extended' = 'extended';
  public mode: 'tutorial' | 'advanced' | 'expert' = 'expert';
  public speed: Speed = Speed.slow;
}
