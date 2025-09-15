import {Component, computed, inject, input, InputSignal, Signal} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import {CardType} from '../interfaces';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-card',
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  public readonly cardType: InputSignal<CardType> = input.required();
  public readonly size = input<'normal' | 'small'>('normal');
  public readonly imageWidth: Signal<number> = computed(() => this.size() === 'small' ? 75 : 150);


  public readonly settingsService = inject(SettingsService);
}
