import {Player} from './model/Player';

export interface CardType {
  player: Player
  cardType: Thing
  points: number
}

export enum Thing {
  Rock = 'R',
  Scissors = 'S',
  Paper = 'P',
  Spock = 'V',
  Lizard = 'L'
}

export enum Speed {
  'slow' = 1000,
  'fast' = 300
}
