// @flow

export interface Countable {
  id: number;
}

// A container class that assignes each entry a unique id
export class Container<T: Countable> {
  entries: Map<number, T>;
  freeIds: Set<number>;

  constructor() {
    this.entries = new Map();
    this.freeIds = new Set();
  }

  getNewId(): number {
    // Try to get an id from the set
    if (this.freeIds.size > 0) {
      const id = this.freeIds.values().next().value;

      if (id !== undefined) {
        this.freeIds.delete(id);
        return id;
      }
      throw new Error('Entry in freeIds is Undefined');
    }
    // Else generate a new one
    return this.entries.size;
  }

  add(object: T) {
    if (object.id !== 0) {
      throw new Error(`Object already has an id: ${object.id}`);
    }

    const id: number = this.getNewId();
    object.id = id;
    this.entries.set(id, object);
  }

  delete(key: number | T) {
    let id: number;
    if (typeof key === 'number') {
      id = key;
    } else {
      id = key.id;
    }

    if (!this.entries.delete(id)) {
      throw new Error(`Cannot find object for id: ${id}`);
    }
    this.freeIds.add(id);
  }

  get(id: number): ?T {
    return this.entries.get(id);
  }
}
