import {IPresenter, IPresenterProps} from "../types";
import {CardPresenter, ModalPresenter, OverlayPresenter, Presenters} from "../supports";


export function useCardPresenter<T extends IPresenterProps>(overlay: HTMLElement, props: T){
  return (new CardPresenter(overlay, props));
}

export function useModalPresenter<T extends IPresenterProps>(overlay: HTMLElement, props: T){
  return (new ModalPresenter(overlay, props));
}

export function useOverlayPresenter<T extends IPresenterProps>(overlay: HTMLElement, props: T){
  return (new OverlayPresenter(overlay, props));
}

export function usePresenterController<P extends IPresenterProps>(presenter: IPresenter<P>){
  return Presenters.context(presenter);
}