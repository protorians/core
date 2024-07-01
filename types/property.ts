
export type IPropertySetterProps<T extends IPropertyScheme, P extends keyof T> = {
  target: T,
  prop: P,
  value?: T[P]
};

export type IPropertyGetterProps<T extends IPropertyScheme, P extends keyof T> = {
  target: T,
  prop: P,
  value?: T[P]
};

export type IPropertySetter<T extends IPropertyScheme, P extends keyof T> = (props: IPropertySetterProps<T, P>) => T[P];

export type IPropertyGetter<T extends IPropertyScheme, P extends keyof T> = (props: IPropertyGetterProps<T, P>) => T[P];

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