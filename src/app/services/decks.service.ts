import {inject, Injectable} from '@angular/core';
import {CardType, MUSTER_DEFAULT, MUSTER_EXTENDED, Thing} from '../interfaces';
import {Player} from '../model/Player';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class DecksService {
  public cups: (CardType)[][] = [[], [], []];
  public playerOne!: Player;
  public playerTwo!: Player;
  public cardCount = 0;
  public putNewCardOnTop = true;
  public topCards: (CardType | null)[] = [null, null, null];
  private settingsService: SettingsService = inject(SettingsService);

  public initiateStartUp() {
    this.cardCount = this.settingsService.cardsRange === 'default' ? 24 : 25;
    this.reset();
    this.playerOne = new Player(this.settingsService.playerOneName, 'one');
    this.playerTwo = new Player(this.settingsService.playerTwoName, 'two');
    this.generateDeck(this.playerOne);
    this.generateDeck(this.playerTwo);
  }

  public handleThrownCard(player: Player, toWhere: 0 | 1 | 2) {
    const deck = player.deck
    const newCard = deck[player.topCardIndex];
    player.forbidPermission(this.settingsService.speed);
    this.handleNewCard(newCard, toWhere);
  }

  public isNewCardStronger(newCard: CardType, topCard: CardType) {
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

  private generateDeck(player: Player) {
    const muster = this.settingsService.cardsRange === 'default' ? [...MUSTER_DEFAULT] : [...MUSTER_EXTENDED];
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

  private handleNewCard(newCard: CardType, cupIndex: 0 | 1 | 2) {
    const topCard = this.topCards[cupIndex];
    this.putNewCardOnTop = true;

    if (topCard) {
      const newCardIsStronger = this.isNewCardStronger(newCard, topCard);

      // card types match - give points to player
      if (newCardIsStronger === null) {
        const player = topCard.player;
        player.points[cupIndex] += topCard.points;
        player.points = [...player.points];
        this.topCards[cupIndex] = newCard;
      }
      // one of two cards win, increases its point value and is put on top
      else if (newCardIsStronger) {
        newCard.points += topCard.points;
        this.topCards[cupIndex] = newCard;
      } else {
        topCard.points += newCard.points
        if (this.settingsService.mode !== 'expert') {
          this.putNewCardOnTop = false;
        }
      }
    } else {
      this.topCards[cupIndex] = newCard;
    }
    this.cups[cupIndex].unshift(newCard);
  }

  private reset() {
    this.playerOne = new Player(this.settingsService.playerOneName, 'one');
    this.playerTwo = new Player(this.settingsService.playerTwoName, 'two');
    this.cups = [[], [], []];
    this.topCards = [null, null, null];
  }
}
