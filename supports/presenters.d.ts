import { HTMLComposite } from "./properties";
import { EventDispatcher } from "./event-dispatcher";
import type { IAppearance, IPresenters, IPresenterProps, IPresenter, IPresenterCardProps, IPresenterModalProps, IPresenterEventScheme, ModalPresenterEventScheme, IPresentersEventScheme, CardPresenterEventScheme, IEventDispatcher, OverlayPresenterEventScheme, IModalPresenter, ICardPresenter, IOverlayPresenter, IPresenterOverlayProps, IPresenterAction, IPresenterSize, IPresenterAxes } from "../types";
export declare class Presenter<T extends IPresenterProps> extends HTMLComposite<T> implements IPresenter<T> {
    #private;
    anchor?: Node;
    appearance: IAppearance;
    transitionTimes: number;
    emitter: IEventDispatcher<IPresenterEventScheme>;
    constructor(overlay: HTMLElement, props: T);
    initialize(): this;
    open(): this;
    close(): this;
    createAnchor(): this;
    removeAnchor(): this;
    action(action: IPresenterAction<T>): this;
    bindAction(element: HTMLElement, name: string): this;
    actionsDetector(host?: HTMLElement): this;
    actions(): IPresenterAction<T>[];
    size(size?: IPresenterSize): number;
    setCanvasSize(size?: IPresenterSize): this;
    setCanvasCentred(axe?: IPresenterAxes): this;
}
/**
 * CardPresenter
 * @description Presentation en carte
 * @example
 * const card = new CardPresenter({
 *    host: document.querySelector<HTMLElement>('.sheet'),
 *    color: '#cacaca',
 *    opacity: 75,
 *    locked: false,
 *    transition: CoreTransitions.SlideFadedVertical,
 * })
 */
export declare class CardPresenter extends Presenter<IPresenterCardProps> implements ICardPresenter {
    emitter: EventDispatcher<CardPresenterEventScheme>;
    initialize(): this;
    open(): this;
    close(): this;
}
/**
 * ModalPresenter
 * @description Presentation en modal
 * @example
 * const modal = new CardPresenter({
 *    host: document.querySelector<HTMLElement>('.sheet'),
 * })
 */
export declare class ModalPresenter extends Presenter<IPresenterModalProps> implements IModalPresenter {
    #private;
    emitter: EventDispatcher<ModalPresenterEventScheme>;
    initialize(): this;
    open(): this;
    close(): this;
}
/**
 * OverlayPresenter
 * @description Presentation en surcouche
 */
export declare class OverlayPresenter extends Presenter<IPresenterOverlayProps> implements IOverlayPresenter {
    emitter: IEventDispatcher<OverlayPresenterEventScheme>;
    initialize(): this;
    setPosition(): this;
    open(): this;
    close(): this;
}
/**
 * Presenters
 * @description Controlleur de présentation dans un context
 * @example
 * const presenter = Presenters.context( ... )
 */
export declare class Presenters<P extends IPresenterProps> implements IPresenters<P> {
    #private;
    emitter: EventDispatcher<IPresentersEventScheme<P>>;
    status: boolean;
    get presenter(): IPresenter<P>;
    constructor(presenter: IPresenter<P>);
    initialize(): this;
    open(): this;
    close(): this;
    render(): this;
    static context<P extends IPresenterProps>(presenter: IPresenter<P>): Presenters<P>;
}
