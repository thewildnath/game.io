// @flow

// eslint-disable-next-line import/no-cycle
import GameObject from './GameObject.js';
import { Countable, Container } from '../utils/structures/Container.js';

export default class Scene implements Countable {
  // Global information about all scenes
  static scenes: Container<Scene>;
  static default: number;


  // Public scene information
  id: number;
  name: string;

  // GameObjects
  gameObjects: Container<GameObject>;
  // Root gameobjects for the scene's graph
  rootGameObjects: Set<GameObject>;

  constructor(name: string, init: () => void = () => {}) {
    Scene.scenes.add(this);
    this.name = name;
    this.gameObjects = new Container();

    init();
  }

  // GameObject managment functions
  add(gameObject: GameObject) {
    if (gameObject.scene !== undefined || gameObject.id !== undefined) {
      throw new Error('GameObject might already be initialised');
    }

    this.gameObjects.add(gameObject);
    gameObject.scene = this;
  }

  delete(key: number | GameObject) {
    let id: number;
    if (typeof key === 'number') {
      id = key;
    } else {
      id = key.id;
    }

    this.gameObjects.delete(id);
  }

  get(id: number): ?GameObject {
    return this.gameObjects.get(id);
  }
}
