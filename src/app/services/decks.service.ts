import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {CardType, Thing} from '../interfaces';
import {Player} from '../model/Player';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DecksService {
  public baskets: WritableSignal<(CardType)[][]> = signal([[], [], []]);
  public playerOneDeck: CardType[] = [];
  public playerTwoDeck: CardType[] = [];
  public playerOne = new Player('one');
  public playerTwo = new Player("two");
  public cardCount = 0;
  private musterDefault: Thing[] = Array(8).fill(0).flatMap(() => [Thing.Rock, Thing.Paper, Thing.Scissors]);
  private musterExtended: Thing[] = Array(5).fill(0).flatMap(() => [Thing.Rock, Thing.Paper, Thing.Lizard, Thing.Spock, Thing.Scissors]);
  private settingsService: SettingsService = inject(SettingsService);

  constructor() {
    this.generateDeck(this.playerOneDeck, this.playerOne);
    this.generateDeck(this.playerTwoDeck, this.playerTwo);
    this.playerOne.deck = this.playerOneDeck;
    this.playerTwo.deck = this.playerTwoDeck;
  }

  public throwCard(player: Player, toWhere: 0 | 1 | 2) {
    const deck = player.deck
    player.forbidPermission(this.settingsService.speed);

    //ToDo konec hry
    if (deck.length === 0) {
      this.endGame();
    }
    return this.landedCardIsWeaker(deck[player.topCardIndex], toWhere);
  }

  private generateDeck(playerDeck: CardType[], player: Player) {
    this.cardCount = this.settingsService.thingsRange === 'default' ? 24 : 25;
    const muster = this.settingsService.thingsRange === 'default' ? [...this.musterDefault] : [...this.musterExtended];
    while (muster.length > 0) {
      const rnd = Math.floor(Math.random() * muster.length);
      const card: CardType = {
        player: player,
        cardType: muster[rnd] as Thing,
        points: 1
      }
      muster.splice(rnd, 1);
      playerDeck.push(card);
    }
  }

  private landedCardIsWeaker(newCard: CardType, basketIndex: 0 | 1 | 2) {
    const basket = this.baskets()[basketIndex];
    if (basket.length === 0) {
      basket.unshift(newCard);
      return false;
    }

    const currentCard = basket[0];
    if (newCard.cardType === currentCard.cardType) {
      const player = currentCard.player;
      player.points[basketIndex] += currentCard.points;
      player.points = [...player.points];
      basket.unshift(newCard);
      return false;
    }

    const newCardIsStronger = this.isNewCardStronger(newCard, currentCard);
    if (newCardIsStronger) {
      console.log(1);
      newCard.points += currentCard.points;
      basket.unshift(newCard);
      return false;
    } else {
      console.log(2);
      currentCard.points += newCard.points;
      basket.splice(1, 0, newCard);
      return true;
    }
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

  private endGame() {
    this.playerOne.permission = false;
    this.playerTwo.permission = false;
  }
}
