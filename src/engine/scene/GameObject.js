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

  constructor(scene: Scene, parent: ?GameObject) {
    if (parent != null) {
      if (scene !== parent.scene) {
        throw new Error('Cannot create GameObject if parent is from another scene.');
      }
      this.parent = parent;
    }

    scene.add(this);
  }

  set parent(parent: GameObject) {
    this.parent = parent;
  }

  // TODO: 'onDestory' should fix GameObject tree and remove event listeners, etc.
}
