// @flow

export default class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  // Const functions
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalised(): Vector2 {
    const d: number = this.magnitude();
    return new Vector2(this.x / d, this.y / d);
  }

  distance(arg: Vector2): number {
    return Math.sqrt((this.x - arg.x) * (this.x - arg.x) + (this.y - arg.y) * (this.y - arg.y));
  }

  distanceSqared(arg: Vector2): number {
    return (this.x - arg.x) * (this.x - arg.x) + (this.y - arg.y) * (this.y - arg.y);
  }

  plus(arg: Vector2): Vector2 {
    return new Vector2(this.x + arg.x, this.y + arg.y);
  }

  minus(arg: Vector2): Vector2 {
    return new Vector2(this.x - arg.x, this.y - arg.y);
  }
}
