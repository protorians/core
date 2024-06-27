import { IPresenter, IPresenterProps } from "../types";
import { CardPresenter, ModalPresenter, OverlayPresenter, Presenters } from "../supports";
export declare function useCardPresenter<T extends IPresenterProps>(overlay: HTMLElement, props: T): CardPresenter;
export declare function useModalPresenter<T extends IPresenterProps>(overlay: HTMLElement, props: T): ModalPresenter;
export declare function useOverlayPresenter<T extends IPresenterProps>(overlay: HTMLElement, props: T): OverlayPresenter;
export declare function usePresenterController<P extends IPresenterProps>(presenter: IPresenter<P>): Presenters<P>;
