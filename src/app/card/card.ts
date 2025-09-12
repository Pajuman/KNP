import {Component, input, InputSignal} from '@angular/core';
import {NgClass} from '@angular/common';
import {CardType} from '../interfaces';

@Component({
  selector: 'app-card',
  imports: [
    NgClass
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  public readonly cardType: InputSignal<CardType> = input.required();
}
