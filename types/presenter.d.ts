import type { IEventDispatcher } from "./event";
import type { IElementTarget } from "./value";
import type { ICoreTransition } from "./transition";
import type { ILayerComposite, IPropertiesBag } from "./composite";
import type { IAppearance } from "./appearance";
export type IPresenterProps = {
    host?: IElementTarget;
    size?: IPresenterSize;
};
export type IPresenterCardProps = IPresenterProps & {};
export type IPresenterOverlayProps = IPresenterProps & {
    direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
};
export type IPresenterModalProps = IPresenterProps & {
    color?: string;
    locked?: boolean;
    /**
     * min : 0
     * max : 100
     */
    opacity?: number;
    transition?: ICoreTransition;
    blurred?: boolean;
};
export interface IPresenters<P extends IPresenterProps> {
    get presenter(): IPresenter<P>;
    status: boolean;
    emitter: IEventDispatcher<IPresentersEventScheme<P>>;
    initialize(): this;
    render(): this;
    close(): this;
    open(): this;
}
export interface IPresentersEventScheme<P extends IPresenterProps> {
    open: IPresenters<P>;
    close: IPresenters<P>;
}
export interface IPresenterEventScheme {
    open: IPresenter<IPresenterProps>;
    close: IPresenter<IPresenterProps>;
}
export interface ModalPresenterEventScheme extends IPresenterEventScheme {
}
export interface CardPresenterEventScheme extends IPresenterEventScheme {
}
export interface OverlayPresenterEventScheme extends IPresenterEventScheme {
}
export type IPresenterActionProps<P extends IPresenterProps> = {
    presenter: IPresenter<P>;
    event?: Event;
};
export type IPresenterActionCallback<P extends IPresenterProps> = (props: IPresenterActionProps<P>) => void;
export interface IPresenterAction<P extends IPresenterProps> {
    name: string;
    type?: keyof HTMLElementEventMap;
    callback: IPresenterActionCallback<P>;
}
export type IPresenterSize = 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
export type IPresenterAxes = 'horizontal' | 'vertical' | 'double';
export interface IPresenter<P extends IPresenterProps> extends ILayerComposite<HTMLElement>, IPropertiesBag<P> {
    emitter: IEventDispatcher<IPresenterEventScheme>;
    appearance: IAppearance;
    anchor?: Node | undefined;
    initialize(): this;
    open(): this;
    close(): this;
    createAnchor(): this;
    removeAnchor(): this;
    action(action: IPresenterAction<P>): this;
    actions(): IPresenterAction<P>[];
    actionsDetector(host?: HTMLElement): this;
    bindAction(element: HTMLElement, name: string): this;
    size(size: IPresenterSize): number;
    setCanvasSize(size?: IPresenterSize): this;
    setCanvasCentred(axe?: IPresenterAxes): this;
}
export interface ICardPresenter extends IPresenter<IPresenterCardProps> {
    emitter: IEventDispatcher<CardPresenterEventScheme>;
}
export interface IModalPresenter extends IPresenter<IPresenterModalProps> {
    emitter: IEventDispatcher<ModalPresenterEventScheme>;
}
export interface IOverlayPresenter extends IPresenter<IPresenterOverlayProps> {
    emitter: IEventDispatcher<OverlayPresenterEventScheme>;
}
