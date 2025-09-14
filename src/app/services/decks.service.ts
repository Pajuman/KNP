import {inject, Injectable} from '@angular/core';
import {CardType, MUSTER_DEFAULT, MUSTER_EXTENDED, Thing} from '../interfaces';
import {Player} from '../model/Player';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DecksService {
  public baskets: (CardType)[][] = [[], [], []];
  public playerOne = new Player('one');
  public playerTwo = new Player("two");
  public cardCount;
  public putNewCardOnTop = true;
  public isGameOver = false;
  public topCards: (CardType | null)[] = [null, null, null];
  private settingsService: SettingsService = inject(SettingsService);

  constructor() {
    this.cardCount = this.settingsService.thingsRange === 'default' ? 24 : 25;
    this.generateDeck(this.playerOne);
    this.generateDeck(this.playerTwo);
  }

  public handleThrownCard(player: Player, toWhere: 0 | 1 | 2) {
    const deck = player.deck
    const newCard = deck[player.topCardIndex];
    player.forbidPermission(this.settingsService.speed);
    this.handleNewCard(newCard, toWhere);
    this.checkEndGame(deck);
  }

  private generateDeck(player: Player) {
    const muster = this.settingsService.thingsRange === 'default' ? [...MUSTER_DEFAULT] : [...MUSTER_EXTENDED];
    let idIndex = 0;
    while (muster.length > 0) {
      const rnd = Math.floor(Math.random() * muster.length);
      const card: CardType = {
        player: player,
        cardType: muster[rnd] as Thing,
        points: 1,
        id: idIndex++
      }
      muster.splice(rnd, 1);
      player.deck.push(card);
    }
  }

  private handleNewCard(newCard: CardType, basketIndex: 0 | 1 | 2) {
    const topcard = this.topCards[basketIndex];
    this.putNewCardOnTop = true;
    if (topcard) {

      // card types match - give points to player
      if (newCard.cardType === topcard.cardType) {
        const player = topcard.player;
        player.points[basketIndex] += topcard.points;
        player.points = [...player.points];
        this.topCards[basketIndex] = newCard;
      }
      // one of two cards win, increases its point value and is put on top
      else {
        this.putNewCardOnTop = this.isNewCardStronger(newCard, topcard);
        if (this.putNewCardOnTop) {
          newCard.points += topcard.points;
          this.topCards[basketIndex] = newCard;
        } else {
          topcard.points += newCard.points
        }
      }
    } else {
      this.topCards[basketIndex] = newCard;
    }
    this.baskets[basketIndex].unshift(newCard);
  }

  private isNewCardStronger(newCard: CardType, currentCard: CardType) {
    switch (newCard.cardType) {
      case Thing.Rock:
        return currentCard.cardType === Thing.Lizard || currentCard.cardType === Thing.Scissors;
      case Thing.Scissors:
        return currentCard.cardType === Thing.Lizard || currentCard.cardType === Thing.Paper;
      case Thing.Paper:
        return currentCard.cardType === Thing.Rock || currentCard.cardType === Thing.Spock;
      case Thing.Spock:
        return currentCard.cardType === Thing.Rock || currentCard.cardType === Thing.Scissors;
      case Thing.Lizard:
        return currentCard.cardType === Thing.Spock || currentCard.cardType === Thing.Paper;
    }
  }

  private checkEndGame(deck: CardType[]) {
    if (deck.length === 0) {
      this.playerOne.permission = false;
      this.playerTwo.permission = false;
      this.isGameOver = true;
    }
  }
}
