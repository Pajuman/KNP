import {Component, inject} from '@angular/core';
import {DecksService} from '../services/decks.service';
import {Trick} from '../interfaces';
import {NgClass} from '@angular/common';
import {Card} from '../card/card';
import {Router} from '@angular/router';

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
  public readonly router = inject(Router);
  protected cupOneTricks: Trick[] = [];
  protected cupTwoTricks: Trick[] = [];
  protected cupThreeTricks: Trick[] = [];
  protected playerOneScore = 0;
  protected playerTwoScore = 0;
  protected winner: 'one' | 'two' | 'draw'

  constructor() {
    this.cupOneTricks = this.divideCardsToTricks(0);
    this.cupTwoTricks = this.divideCardsToTricks(1);
    this.cupThreeTricks = this.divideCardsToTricks(2);
    this.winner = this.findWinner();
  }

  public backToSettings() {
    this.router.navigate(['']);
  }

  private divideCardsToTricks(cupIndex: number) {
    const cup = this.decksService.cups[cupIndex];
    let topCard = cup[cup.length - 1];
    let currentTrick: Trick = {cards: [topCard], winningCard: topCard};
    const tricks: Trick[] = [];

    for (let i = cup.length - 2; i >= 0; i--) {
      const newCard = cup[i];
      const newCardIsStronger = this.decksService.isNewCardStronger(newCard, currentTrick.winningCard);

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

  private findWinner() {
    for (let i = 0; i <= 2; i++) {
      const p1 = this.decksService.playerOne.points[i];
      const p2 = this.decksService.playerTwo.points[i];

      if (p1 > p2) {
        this.playerOneScore++;
      } else if (p2 > p1) {
        this.playerTwoScore++;
      }
    }

    if (this.playerOneScore > this.playerTwoScore) {
      return 'one';
    } else if (this.playerTwoScore > this.playerOneScore) {
      return 'two';
    } else {
      return 'draw';
    }
  }
}
