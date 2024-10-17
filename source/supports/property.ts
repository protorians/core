import type {
  IProperty,
  IPropertyEachCallback,
  IPropertyGetter,
  IPropertyScheme,
  IPropertySetter
} from "../types";


export class Property<T extends IPropertyScheme> implements IProperty<T> {

  protected _map: Map<keyof T, T[keyof T]>;
  protected _origin: T;
  protected _setter: (IPropertySetter<T, keyof T>)[] = [];
  protected _getter: (IPropertyGetter<T, keyof T>)[] = [];

  state: T;

  constructor(scheme?: T) {
    scheme = structuredClone<T>(scheme || {} as T)
    this._map = new Map<keyof T, T[keyof T]>();
    this._origin = scheme;
    this.state = new Proxy<T>(scheme, this.stateHandler())
    this.reset()
  }

  static context<T extends IPropertyScheme>(scheme?: T): IProperty<T> {
    return new this(scheme);
  }

  protected stateHandler(): ProxyHandler<T> {
    const current = this;
    return {
      set(target, prop, value, receiver) {
        current._setter.forEach(callback => value = callback({target, prop: prop as keyof T, value}));
        current.map.set(prop as keyof T, value);
        return Reflect.set(target, prop, value, receiver)
      },
      get(target, prop) {
        let value = current.get(prop as keyof T)
        current._getter.forEach(callback => value = callback({target, prop: prop as keyof T, value}));
        return value;
      },
    }
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

  setter(setter: IPropertySetter<T, keyof T>): this {
    this._setter.push(setter);
    return this;
  }

  getter(getter: IPropertyGetter<T, keyof T>): this {
    this._getter.push(getter);
    return this;
  }

  each(callback: IPropertyEachCallback<T>): IProperty<T> {
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
    return this.fill(this._origin);
  }

  clear(): IProperty<T> {
    this._map.clear()
    return this;
  }

  delete<P extends keyof T>(key: P): IProperty<T> {
    this._map.delete(key)
    return this;
  }

  export(): T {
    const property = {} as T;
    this._map.forEach((value, key) => property[key] = this.state[key] || value);
    return property;
  }

}
