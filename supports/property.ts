import type {
  IProperty,
  PropertyEachCallback,
  PropertyScheme
} from "../types";


export class Property<T extends PropertyScheme> implements IProperty<T> {

  protected _map: Map<keyof T, T[keyof T]>;
  protected originScheme: T;

  constructor(scheme: T) {
    this._map = new Map<keyof T, T[keyof T]>();
    this.originScheme = scheme;
    this.reset()
  }

  get map(): Map<keyof T, T[keyof T]> {
    return this._map;
  }

  get scheme(): IterableIterator<[keyof T, T[keyof T]]> {
    return this._map.entries();
  }

  get values(): IterableIterator<T[keyof T]> {
    return this._map.values();
  }

  get keys(): IterableIterator<keyof T> {
    return this._map.keys();
  }

  each(callback: PropertyEachCallback<T>): IProperty<T> {
    this._map.forEach(callback)
    return this;
  }

  set<P extends keyof T>(key: P, value: T[P]): IProperty<T> {
    this._map.set(key, value as T[P]);
    return this;
  }

  get<P extends keyof T>(key: P): T[P] {
    return this._map.get(key) as T[P];
  }

  exist<P extends keyof T>(key: P): boolean {
    return this._map.has(key);
  }

  fill(scheme: T): IProperty<T> {
    Object.entries(scheme).forEach(([key, value]) => {
      this._map.set(key, value as T[keyof T]);
    })
    return this;
  }

  reset(): IProperty<T> {
    return this.fill(this.originScheme);
  }

  clear(): IProperty<T> {
    this._map.clear()
    return this;
  }

  delete<P extends keyof T>(key: P): IProperty<T> {
    this._map.delete(key)
    return this;
  }


}