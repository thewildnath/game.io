// @flow

// eslint-disable-next-line import/no-cycle
import Scene from './Scene.js';
import { Countable } from '../utils/structures/Container.js';

export default class GameObject implements Countable {
  // Own information
  id: number;
  name: String;
  isEnabled: boolean;

  // Scene tree information
  scene: Scene;
  parent: ?GameObject;
  children: Array<GameObject>;

  constructor(scene: Scene) {
    scene.add(this);
  }

  // TODO: 'onDestory' should fix GameObject tree and remove event listeners, etc.
}
