import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  viewChildren,
  WritableSignal
} from '@angular/core';
import {Card} from '../card/card';
import {CardType} from '../interfaces';
import {DecksService} from '../services/decks.service';
import {Player} from '../model/Player';
import {NgStyle} from '@angular/common';
import {AnimationService} from '../services/animation.service';

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
  protected playerOne!: Player;
  protected playerTwo!: Player;
  protected baskets!: WritableSignal<(CardType)[][]>;
  protected readonly decksService = inject(DecksService);
  protected readonly animationService = inject(AnimationService);
  private readonly renderer = inject(Renderer2);
  private playerOneCardElements = viewChildren('playerOneCard', {read: ElementRef});
  private playerTwoCardElements = viewChildren('playerTwoCard', {read: ElementRef});
  private z = 100;

  ngOnInit(): void {
    this.playerOne = this.decksService.playerOne;
    this.playerTwo = this.decksService.playerTwo;
    this.baskets = this.decksService.baskets;
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
    if (basket !== null && player) {
      if (player.permission) {
        const cardThrownIsWeaker = this.decksService.throwCard(player, basket);
        const z = cardThrownIsWeaker ? this.z : this.z++;
        const playerElements = player.name === 'one' ? this.playerOneCardElements() : this.playerTwoCardElements();

        if (cardThrownIsWeaker) {
          /*
                    this.increaseZ(this.baskets()[basket][0].);
          */
        }
        const cardEl = playerElements[player.topCardIndex].nativeElement;
        console.log(cardEl);
        const [targetX, targetY, targetRotate] = this.animationService.animateCard(player, basket);
        this.renderCard(cardEl, targetX, targetY, targetRotate, z);
        player.topCardIndex++;
      }


    }
  }

  private renderCard(cardEl: ElementRef<any>, targetX: number, targetY: number, targetRotate: number, z: number) {
    this.renderer.setStyle(cardEl, 'z-index', z);
    this.renderer.setStyle(cardEl, 'transform', 'translateX(0px) translateY(0px) rotate(0deg)');
    this.renderer.setStyle(cardEl, 'transition', 'transform 1s linear');

    setTimeout(() => {
      this.renderer.setStyle(
        cardEl,
        'transform',
        `translateX(${targetX}px) translateY(${targetY}px) rotate(${targetRotate}deg)`
      );
    }, 50);
  }

  private increaseZ(cardEl: ElementRef<any>) {
    this.renderer.setStyle(cardEl, 'z-index', this.z++);
  };
}
