import {Player} from './model/Player';

export interface CardType {
  player: Player
  cardType: Thing
  points: number
  id: number
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

export const MUSTER_DEFAULT: Thing[] = Array(8).fill(0).flatMap(() => [Thing.Rock, Thing.Paper, Thing.Scissors]);
export const MUSTER_EXTENDED: Thing[] = Array(5).fill(0).flatMap(() => [Thing.Rock, Thing.Paper, Thing.Lizard, Thing.Spock, Thing.Scissors]);
