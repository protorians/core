
export type IPropertyScheme = {
  [P: string]: string | null | undefined;
}

export type IPropertyEachCallback<T extends IPropertyScheme> = (value: T[keyof T], key: keyof T, map: Map<keyof T, T[keyof T]>) => void

export interface IProperty<T extends IPropertyScheme> {
  get map(): Map<keyof T, T[keyof T]>;
  get scheme():  IterableIterator<[keyof T, T[keyof T]]>;
  get values(): IterableIterator<T[keyof T]>;
  get keys(): IterableIterator<keyof T>;
  each(callback: IPropertyEachCallback<T>): IProperty<T>
  set<P extends keyof T>(name: P, value: T[P]): IProperty<T>;
  get<P extends keyof T>(name: P): T[P];
  exist<P extends keyof T>(key: P): boolean;
  fill(scheme: T): IProperty<T>;
  reset(): IProperty<T>;
  clear(): IProperty<T>;
  delete<P extends keyof T>(key: P): IProperty<T>;
  export(): T;
}