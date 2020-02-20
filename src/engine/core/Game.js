// @flow

/* Container for all Game configurations */

export type GameConfig = {|
  targetFPS: number;
  targetFixedFPS: number;
|};

const defaultGameConfig: GameConfig = {
  targetFPS: 60,
  targetFixedFPS: 60,
};

/* Main class, game manager */

export class Game {
  config: GameConfig;

  constructor(config: GameConfig) {
    this.config = defaultGameConfig;
    Object.assign(this.config, config);
  }
}
