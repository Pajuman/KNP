import {CardType, Speed} from '../interfaces';

export class Player {
  public deck: CardType[] = [];
  public permission: boolean = true;
  public points = [0, 0, 0];
  public name: string
  public topCardIndex = 0;
  public id: 'one' | 'two';

  constructor(name: string, id: 'one' | 'two') {
    this.name = name
    this.id = id;
  }

  public forbidPermission(speed: Speed) {
    this.permission = false;
    setTimeout(() => this.permission = true, speed);
  }

}
