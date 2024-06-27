import type { IEventDispatcher, INavigation, INavigationEmitterScheme, INavigationMiddlewareCallback, INavigationOptions } from "../types";
/**
 * Système de navigation
 */
export declare class Navigation<Scheme> implements INavigation<Scheme> {
    #private;
    options: INavigationOptions<Scheme>;
    emitter: IEventDispatcher<INavigationEmitterScheme<Scheme>>;
    constructor();
    currentRouteName(): keyof Scheme;
    oldRouteName(): keyof Scheme | undefined;
    currentQuery<T>(): T | undefined;
    setOption(optionName: keyof INavigationOptions<Scheme>, value: (INavigationMiddlewareCallback<Scheme>[] & boolean) | undefined): this;
    setOptions(options: INavigationOptions<Scheme>): this;
    middleware(middleware: INavigationMiddlewareCallback<Scheme>): this;
    observe(): this;
    capturesActions(): this;
    parseRouteName(routeName: string): string;
    isExternalURL(url: string): boolean;
    parseElementCaptured(ev: Event): HTMLElement | undefined;
    dispatchNavigate(ev?: Event | undefined): this;
    navigate(route: keyof Scheme, props?: (Scheme[keyof Scheme]), ev?: Event): this;
}
