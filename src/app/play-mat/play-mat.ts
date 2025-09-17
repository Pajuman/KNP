import {Component, ElementRef, HostListener, inject, OnInit, Renderer2, viewChildren} from '@angular/core';
import {Card} from '../card/card';
import {CardType} from '../interfaces';
import {DecksService} from '../services/decks.service';
import {Player} from '../model/Player';
import {NgStyle} from '@angular/common';
import {AnimationService} from '../services/animation.service';
import {SettingsService} from '../services/settings.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-play-mat',
  imports: [
    Card,
    NgStyle
  ],
  templateUrl: './play-mat.html',
  styleUrl: './play-mat.scss',
})
export class PlayMat implements OnInit {
  public topCards!: (CardType | null)[];
  protected playerOne!: Player;
  protected playerTwo!: Player;
  protected readonly decksService = inject(DecksService);
  protected readonly animationService = inject(AnimationService);
  protected readonly settingsService = inject(SettingsService);
  private readonly renderer = inject(Renderer2);
  private readonly router = inject(Router);
  private playerOneCardElements = viewChildren('playerOneCard', {read: ElementRef});
  private playerTwoCardElements = viewChildren('playerTwoCard', {read: ElementRef});
  private z = 100;
  private isGameOver = false;


  constructor() {
    this.decksService.initiateStartUp();
  }

  ngOnInit(): void {
    this.playerOne = this.decksService.playerOne;
    this.playerTwo = this.decksService.playerTwo;
    this.topCards = this.decksService.topCards;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    let basket: 0 | 1 | 2 | null = null;
    let player: Player | null = null;

    switch (event.key) {
      case 'a':
        basket = 0;
        player = this.playerOne;
        break;
      case 's':
        basket = 1;
        player = this.playerOne;
        break;
      case 'd':
        basket = 2;
        player = this.playerOne;
        break;
      case 'ArrowLeft':
        basket = 0;
        player = this.playerTwo;
        break;
      case 'ArrowDown':
        basket = 1;
        player = this.playerTwo;
        break;
      case 'ArrowRight':
        basket = 2;
        player = this.playerTwo;
        break;
    }

    if (basket !== null && player && player.permission && !this.isGameOver) {
      this.decksService.handleThrownCard(player, basket);
      this.renderThrownCard(player, basket);
      if (!this.decksService.putNewCardOnTop) {
        this.increaseZ(basket);
      }
      player.topCardIndex++;
      this.checkEndGame(player);
    }
  }

  public backToSettings() {
    this.router.navigate(['']);
  }

  private renderThrownCard(player: Player, basket: 0 | 1 | 2) {
    const newCardZ = this.decksService.putNewCardOnTop ? ++this.z : this.z;

    const playerElements = player.name === 'one' ? this.playerOneCardElements() : this.playerTwoCardElements();
    const cardEl = playerElements[player.topCardIndex].nativeElement;
    const [targetX, targetY, targetRotate] = this.animationService.animateCard(player, basket);
    this.renderer.setStyle(cardEl, 'z-index', newCardZ);
    this.renderer.setStyle(cardEl, 'transform', 'translateX(0px) translateY(0px) rotate(0deg)');
    this.renderer.setStyle(cardEl, 'transition', 'transform ' + this.settingsService.speed / 1000 + 's linear');

    setTimeout(() => {
      this.renderer.setStyle(
        cardEl,
        'transform',
        `translateX(${targetX}px) translateY(${targetY}px) rotate(${targetRotate}deg)`
      );
    }, 10);
  }

  private increaseZ(basketIndex: 0 | 1 | 2) {
    const card = this.topCards[basketIndex] as CardType;
    const cardId = card.id;
    const player = card.player
    const cardElements = player.name === 'one' ? this.playerOneCardElements() : this.playerTwoCardElements();
    const cardEl = cardElements[cardId].nativeElement;
    this.renderer.setStyle(cardEl, 'z-index', ++this.z);
  };

  private checkEndGame(player: Player) {
    if (player.topCardIndex === (player.deck.length)) {
      console.log('now');
      this.playerOne.permission = false;
      this.playerTwo.permission = false;
      this.isGameOver = true;
      setTimeout(() => this.addPointsFromTopCards(), 1000);
      setTimeout(() => this.endGame(), 2500);
    }
  }

  private addPointsFromTopCards() {
    for (let i = 0; i === 2; i++) {
      const card = this.topCards[i] as CardType;
      const player = card.player;
      player.points[i] += card.points;
    }
  }

  private endGame() {
    this.router.navigate(['evaluation']);
  }
}
