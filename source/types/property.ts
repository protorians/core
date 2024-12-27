export type IPropertyCallbackResponse<T extends IPropertyScheme, P extends keyof T> = {
  target: T,
  prop: P,
  value: T[P]
};

export type IPropertyCallback<T extends IPropertyScheme, P extends keyof T> = (props: IPropertyCallbackResponse<T, P>) => T[P];

export type IPropertySpecificCallback<T extends IPropertyScheme, P extends keyof T> = {
  [K in P]: IPropertyCallback<T, K>[];
};

export type IPropertyScheme = {
  [P: string]: string | number | boolean | null | undefined | Symbol | BigInt
}

export type IPropertyEachCallback<T extends IPropertyScheme> = (value: T[keyof T], key: keyof T, map: Map<keyof T, T[keyof T]>) => void

export interface IProperty<T extends IPropertyScheme> {
  get map(): Map<keyof T, T[keyof T]>;

  get scheme(): IterableIterator<[keyof T, T[keyof T]]>;

  get values(): IterableIterator<T[keyof T]>;

  get keys(): IterableIterator<keyof T>;

  state: T

  effect<P extends keyof T>(key: P, callback: IPropertyCallback<T, P>): this;

  effects(callback: IPropertyCallback<T, keyof T>): this;

  transform<P extends keyof T>(key: P, callback: IPropertyCallback<T, P>): this;

  transforms(getter: IPropertyCallback<T, keyof T>): this;

  each(callback: IPropertyEachCallback<T>): this;

  set<P extends keyof T>(name: P, value: T[P]): this;

  get<P extends keyof T>(name: P): T[P];

  exist<P extends keyof T>(key: P): boolean;

  fill(scheme: T): this;

  reset(): this;

  clear(): this;

  delete<P extends keyof T>(key: P): this;

  export(): T;
}