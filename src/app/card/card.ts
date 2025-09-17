import {Component, HostBinding, inject, input, InputSignal} from '@angular/core';
import {NgClass} from '@angular/common';
import {CardType} from '../interfaces';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-card',
  imports: [
    NgClass,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  public readonly cardType: InputSignal<CardType> = input.required();
  public readonly size = input<'normal' | 'small'>('normal');
  public readonly showPoints = input<boolean>(true);
  public readonly isWinningCard = input<boolean>(false);

  public readonly settingsService = inject(SettingsService);

  @HostBinding('style.position')
  get position() {
    return this.size() === 'normal' ? 'absolute' : 'relative';
  }
}
