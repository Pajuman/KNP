import {Component, inject} from '@angular/core';
import {DecksService} from '../services/decks.service';
import {CardType, Thing, Trick} from '../interfaces';
import {NgClass} from '@angular/common';
import {Card} from '../card/card';

@Component({
  selector: 'app-evaluation',
  imports: [
    NgClass,
    Card
  ],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.scss'
})
export class Evaluation {
  public readonly decksService = inject(DecksService);
  protected basketOneTricks: Trick[] = [];
  protected basketTwoTricks: Trick[] = [];
  protected basketThreeTricks: Trick[] = [];

  constructor() {
    this.basketOneTricks = this.divideCardsToTricks(0);
    this.basketTwoTricks = this.divideCardsToTricks(1);
    this.basketThreeTricks = this.divideCardsToTricks(2);
  }

  private divideCardsToTricks(basketIndex: number) {
    const basket = this.decksService.baskets[basketIndex];
    let topCard = basket[basket.length - 1];
    let currentTrick: Trick = {cards: [topCard], winningCard: topCard};
    const tricks: Trick[] = [];

    for (let i = basket.length - 2; i >= 0; i--) {
      const newCard = basket[i];
      const newCardIsStronger = this.isNewCardStronger(newCard, currentTrick.winningCard);

      if (newCardIsStronger === null) {
        tricks.push(currentTrick);
        currentTrick = {
          cards: [newCard],
          winningCard: newCard
        }
      } else {
        currentTrick.cards.push(newCard);
        if (newCardIsStronger) {
          currentTrick.winningCard = newCard;
        }
      }
    }
    tricks.push(currentTrick);

    return tricks;
  }

  private isNewCardStronger(newCard: CardType, topCard: CardType) {
    if (newCard.cardType === topCard.cardType) {
      return null;
    }

    switch (newCard.cardType) {
      case Thing.Rock:
        return topCard.cardType === Thing.Lizard || topCard.cardType === Thing.Scissors;
      case Thing.Scissors:
        return topCard.cardType === Thing.Lizard || topCard.cardType === Thing.Paper;
      case Thing.Paper:
        return topCard.cardType === Thing.Rock || topCard.cardType === Thing.Spock;
      case Thing.Spock:
        return topCard.cardType === Thing.Rock || topCard.cardType === Thing.Scissors;
      case Thing.Lizard:
        return topCard.cardType === Thing.Spock || topCard.cardType === Thing.Paper;
    }
  }
}
