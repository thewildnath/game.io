// @flow

import Vector2 from './vector2';

export default class Transform {
  position: Vector2;
  scale: number;
  direction: number;

  constructor(position: Vector2, scale: number = 1, direction: number = 0) {
    this.position = position;
    this.scale = scale;
    this.direction = direction;
  }
}
