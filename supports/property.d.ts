import type { IProperty, PropertyEachCallback, PropertyScheme } from "../types";
export declare class Property<T extends PropertyScheme> implements IProperty<T> {
    protected _map: Map<keyof T, T[keyof T]>;
    protected originScheme: T;
    constructor(scheme?: T);
    static context<T extends PropertyScheme>(scheme?: T): IProperty<T>;
    get map(): Map<keyof T, T[keyof T]>;
    get scheme(): IterableIterator<[keyof T, T[keyof T]]>;
    get values(): IterableIterator<T[keyof T]>;
    get keys(): IterableIterator<keyof T>;
    each(callback: PropertyEachCallback<T>): IProperty<T>;
    set<P extends keyof T>(key: P, value: T[P]): IProperty<T>;
    get<P extends keyof T>(key: P): T[P];
    exist<P extends keyof T>(key: P): boolean;
    fill(scheme: T): IProperty<T>;
    reset(): IProperty<T>;
    clear(): IProperty<T>;
    delete<P extends keyof T>(key: P): IProperty<T>;
}
