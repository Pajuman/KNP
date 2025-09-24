import {Injectable} from '@angular/core';
import {Player} from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  public animateCard(player: Player, basket: 0 | 1 | 2) {
    const direction = Math.random() < 0.5 ? -1 : 1;
    const targetRotate = Math.random() * 720 * direction;
    const targetX = this.calculateX(player, basket);
    const targetY = this.calculateY(player);

    return [targetX, targetY, targetRotate];
  }

  private calculateX(player: Player, basket: 0 | 1 | 2) {
    const rnd = Math.floor(Math.random() * 30);
    const directionCoordinate = basket === 0 ? -253 : basket === 1 ? 47 : 345;
    const currentPositionCoordinate = player.topCardIndex * 3;

    return (rnd + directionCoordinate - currentPositionCoordinate);
  }

  private calculateY(player: Player) {
    const rnd = Math.floor(Math.random() * 30);
    const directionCoordinate = player.id === 'one' ? 290 : -275;
    const currentPositionCoordinate = player.topCardIndex;

    return (rnd + directionCoordinate - currentPositionCoordinate);
  }
}
