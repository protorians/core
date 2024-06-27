export type PropertyScheme = {
    [P: string]: string | null | undefined;
};
export type PropertyEachCallback<T extends PropertyScheme> = (value: T[keyof T], key: keyof T, map: Map<keyof T, T[keyof T]>) => void;
export interface IProperty<T extends PropertyScheme> {
    get map(): Map<keyof T, T[keyof T]>;
    get scheme(): IterableIterator<[keyof T, T[keyof T]]>;
    get values(): IterableIterator<T[keyof T]>;
    get keys(): IterableIterator<keyof T>;
    each(callback: PropertyEachCallback<T>): IProperty<T>;
    set<P extends keyof T>(name: P, value: T[P]): IProperty<T>;
    get<P extends keyof T>(name: P): T[P];
    exist<P extends keyof T>(key: P): boolean;
    fill(scheme: T): IProperty<T>;
    reset(): IProperty<T>;
    clear(): IProperty<T>;
    delete<P extends keyof T>(key: P): IProperty<T>;
}
