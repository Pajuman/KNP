import {CardType, Speed} from '../interfaces';

export class Player {
  public deck: CardType[] = [];
  public permission: boolean = true;
  public points = [0, 0, 0];
  public name: 'one' | 'two'
  public topCardIndex = 0;

  constructor(name: 'one' | 'two') {
    this.name = name
  }

  public forbidPermission(speed: Speed) {
    this.permission = false;
    setTimeout(() => this.permission = true, speed);
  }

}
