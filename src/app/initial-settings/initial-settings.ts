import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SettingsService} from '../services/settings.service';
import {Speed} from '../interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'app-initial-settings',
  imports: [
    FormsModule
  ],
  templateUrl: './initial-settings.html',
  styleUrl: './initial-settings.scss'
})
export class InitialSettings {
  public selectedCards: 'default' | 'extended' = 'default'
  public selectedMode: 'tutorial' | 'advanced' | 'expert' = 'tutorial'
  public selectedSpeed: Speed = Speed.slow
  protected readonly Speed = Speed;

  private settingsService = inject(SettingsService);
  private router = inject(Router);

  public startGame() {
    this.settingsService.thingsRange = this.selectedCards;
    this.settingsService.mode = this.selectedMode;
    this.settingsService.speed = this.selectedSpeed;

    this.router.navigate(['play']);
  }
}
