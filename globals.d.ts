declare module '@protorians/core/animation' {
  import type { ICoreAnimation, ICoreAnimationFeatures, ICoreAnimationOptions, IElementTarget, IAnimationStateCallback, IAnimationCalibrate } from '@protorians/core/types';
  export class CoreAnimation implements ICoreAnimation {
      #private;
      get features(): ICoreAnimationFeatures;
      constructor(features: ICoreAnimationFeatures, options?: ICoreAnimationOptions);
      calibrate(feature: keyof ICoreAnimationFeatures, property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      calibrates(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      reset(target: IElementTarget): this;
      start(target: IElementTarget, callback?: IAnimationStateCallback): this;
  }

}
declare module '@protorians/core/appearance' {
  import EventDispatcher from "@protorians/core/event-dispatcher";
  import type { IAppearance, IAppearanceEmitterScheme, IAppearanceObject, IAppearanceObjectDestroyed, IAppearanceStyleSheet, IAppearanceValues } from "@protorians/core/types";
  /**
   * CoreAppearanceProps
   * @description Analyse la propriété de l'apparence et la réecrit
   * @param name Nom de la propriété
   * @param value Valeur de la propriété
   * @example
   * CoreAppearanceProps<IAppearanceObject>( { color : '#777' } )
   */
  export function CoreAppearanceProps<T extends IAppearanceObject | IAppearanceObjectDestroyed>(name: keyof IAppearanceObject, value: IAppearanceValues): T;
  /**
   * CoreAppearanceValues
   * @description Analyse la valeur d'une propriété de l'apparence
   * @param value Valeur de la propriété
   * @example
   * CoreAppearanceValues( ... )
   */
  export function CoreAppearanceValues(value: IAppearanceValues): string | undefined;
  /**
   * AUN Appearance
   * @description Gestionnaire d'apparence des éléments AUN
   */
  export default class CoreAppearance implements IAppearance {
      /**
       * Instance du DOM
       */
      instance: HTMLStyleElement;
      /**
       * Signature de l'apparence
       */
      uid: string;
      /**
       * Instance de l'emetteur
       */
      emitter: EventDispatcher<IAppearanceEmitterScheme>;
      /**
       * Propriétés de l'apparence
       */
      properties: IAppearanceObject;
      constructor();
      /**
       * sheet
       * C@description onstruire une feuille de style liée à l'apparence
       * @param stylesheet Definit la feuille de style
       * @example
       * appearance.sheet( {
       *    'selector' : {
       *       'property' : 'value',
       *        ...
       *    }
       * } )
       */
      sheet(stylesheet: IAppearanceStyleSheet): this;
      /**
       * inject
       * @description Inject du code CSS dans l'instance de l'apparence courante par substitution
       * @param code
       * @example
       *  appearance.inject("body{ color: red; }")
       */
      inject(code: string | string[]): this;
      /**
       * insertProperties
       * @description Insert des propriétés d'apparence dans un objet support. Analyse les propriétés et les valeurs avant de les insérer
       * @param properties Propriétés d'apparence support
       * @param data Données des propriétés à insérer
       * @example
       * appearance.insertProperties( objectPropertiesSupport, objectDataToInsert )
       */
      insertProperties(properties: IAppearanceObject, data: IAppearanceObject): IAppearanceObject;
      /**
       * removeProperties
       * @description Supprime des propriétés d'apparence dans un object support.
       * @param properties Propriétés d'apparence support
       * @param payload Données des propriétés à supprimer
       * @example
       * appearance.removeProperties( objectPropertiesSupport, objectDataToRemove )
       */
      removeProperties(properties: IAppearanceObject, payload: IAppearanceObjectDestroyed): IAppearanceObject;
      /**
       * set
       * @description Insert des propriétés d'apparence. Analyse les propriétés et les valeurs avant de les insérer
       * @param properties Propriétés à insérer
       * @example
       * appearance.set( {
       *    'property' : 'value',
       *    ...
       * } )
       */
      set(properties: IAppearanceObject): this;
      /**
       * unset
       * @description Supprime des propriétés d'apparence. Analyse les propriétés et les valeurs avant.
       * @param properties Propriétés à supprimer
       * @example
       * appearance.unset( {
       *    'property' : 'value',
       *    ...
       * } )
       */
      unset(properties: IAppearanceObjectDestroyed): this;
      /**
       * mount
       * @description Monter l'apparence si ce n'est pas fait
       * @example
       * appearance.mount()
       */
      mount(): this;
      /**
       * mountImmediat
       * @description Monter l'apparence
       * @example
       * appearance.mountImmediat()
       */
      mountImmediat(): this;
      /**
       * destroy
       * @description Détruit l'apparence
       * @example
       * appearance.destroy()
       */
      destroy(): this;
      /**
       * sync
       * @description Synchronise l'apparence
       * @example
       * appearance.sync()
       */
      sync(): this;
  }

}
declare module '@protorians/core/attribute' {
  import type { ICoreAttribute, ICoreAttributesEmitterScheme, IElementTarget } from "@protorians/core/types";
  import EventDispatcher from "@protorians/core/event-dispatcher";
  /**
   * AUN Attribute
   * @description Gestionnaire d'attribute dynamique
   */
  export class CoreAttribute implements ICoreAttribute {
      #private;
      /**
       * Nom de lattribut
       */
      attributeName: string;
      /**
       * Emetteur
       */
      emitter: EventDispatcher<ICoreAttributesEmitterScheme>;
      /**
       * Les entrées
       */
      get entries(): string[];
      /**
       * La valeur de l'attribut
       */
      get value(): string;
      constructor(element: IElementTarget | null, attributeName?: string);
      /**
       * sync
       * @description Synchronise les attributs
       * @param attributeName Nom de l'attribut
       * @description
       * attribut.sync()
       */
      sync(attributeName?: string): this;
      /**
       * add
       * @description Ajout une entrée à l'attribut
       * @param value Valeur de l'attribut
       * @example
       * attribut.add( ... )
       */
      add(value: string): this;
      /**
       * remove
       * @description Supprimer une entrée de l'attribut
       * @param value Valeur de l'attribut
       * @example
       * attribut.remove( ... )
       */
      remove(value: string): this;
      /**
       * replace
       * @description Remplace le valeur dans un attribut
       * @param older Ancienne valeur de l'attribut
       * @param value Nouvelle valeur de l'attribut
       * @example
       * attribut.replace( 'oldValue', 'newValue' )
       */
      replace(older: string, value: string): this;
      /**
       * contains
       * @description Recherche l'existence d'une valeur dans l'instance de l'attribut
       * @param value Valeur dans l'attribut recherché
       * @example
       * attribut.contains( 'searchValue' )
       */
      contains(value: string): boolean;
      /**
       * link
       * @description Lie un attribut à une instance du DOM
       * @example
       * attribut.link()
       */
      link(): this;
      /**
       * unlink
       * @description Supprime la liaison d'un attribut dans  l'instance
       * @param attributes Nom de l'attribut
       * @example
       * attribut.unlink( 'attributName' )
       */
      unlink(attributes?: string | string[]): this;
  }

}
declare module '@protorians/core/climbing' {
  import type { IClimbing, IClimbingAsyncTask, IClimbingNext, IClimbingTask, IClimbingYield } from "@protorians/core/types";
  export default class Climbing<R> implements IClimbing<R> {
      /**
       * Tableau de réponse
       */
      responses: Array<R>;
      /**
       * Liste des étapes préparées
       */
      prepared: IClimbingTask<R> | undefined;
      /**
       * Fonction de rendement
       */
      yield: IClimbingYield<R>;
      constructor(entries: Array<R>, callback: IClimbingAsyncTask<R>);
      /**
       * Déclencher l'escalade
       * @param done Fonction de rappel quand l'escalade est complète
       * @param start Index à laquelle doit commencer l'escalade
       */
      trigger(done: IClimbingNext<R>, start?: number): this;
      /**
       * Création de l'escalade
       * @param entries Tableau d'élément de type <R>
       * @param callback Fonction de rappel pour instancier une nouvelle entrée de l'escalade
       */
      create(entries: Array<R>, callback: IClimbingAsyncTask<R>): IClimbingYield<R>;
      /**
       * Prochaine étape dans le tableau de l'escalade
       * @param prepared Préparation de la liste des étapes de l'escalade
       * @param next Fonction de rapel pour la prochaine étape dans l'escalade
       */
      next(prepared: IClimbingTask<R>, next: IClimbingNext<R>): boolean;
  }

}
declare module '@protorians/core/composite' {
  import type { ILayerComposite, ILayerCompositeChild, ILayerComposites, IModelComposite, IProps } from "@protorians/core/types";
  export class ModelComposite<P> implements IModelComposite<P> {
      #private;
      get properties(): P;
      property(name: keyof P): P[keyof P] | undefined;
      setProperty(name: keyof P, value: P[keyof P]): this;
      constructor(props: P);
  }
  export class LayerComposite<Layer, P> extends ModelComposite<P> implements ILayerComposite<Layer> {
      #private;
      get layer(): Layer;
      layers: ILayerComposites<Layer>;
      constructor(element: Layer, props: P);
      initialize(): this;
      createLayer(identifier: string): this;
      removeLayer(identifier: string): this;
      render(): Layer;
      append(childElement?: ILayerCompositeChild<Layer> | undefined): this;
      appendElement(child?: Layer | undefined): this;
  }
  export class LayerCompositeChild<Layer, P extends IProps> extends LayerComposite<Layer, P> implements ILayerCompositeChild<Layer> {
      parent?: ILayerComposite<Layer> | undefined;
      plug(parent: ILayerComposite<Layer>): this;
  }
  export class HTMLComposite<P> extends LayerComposite<HTMLElement, P> {
      initialize(): this;
      createLayer(identifier: string, tagname?: keyof HTMLElementTagNameMap | undefined): this;
      removeLayer(identifier: string): this;
      render(): HTMLElement;
      append(childElement?: ILayerCompositeChild<HTMLElement> | undefined): this;
      appendElement(child?: HTMLElement | undefined): this;
  }
  export class HTMLChildComposite<P extends IProps> extends HTMLComposite<P> {
  }

}
declare module '@protorians/core/event-dispatcher' {
  import type { IEventDispatcher, IEventDispatcherCallback, IEventDispatcherEntries, IEventDispatcherProgations, IEventDispatcherScheme } from "@protorians/core/types";
  /**
   * Protorian EventDispatcher — Emetteur d'émission
   * @description Gestionnaire d'évènements
   * @example new EventDispatcher<EmitScheme>()
   */
  export default class EventDispatcher<Scheme extends IEventDispatcherScheme> implements IEventDispatcher<Scheme> {
      /**
       * Gestion de la propagation
       */
      propagations: IEventDispatcherProgations<Scheme>;
      /**
       * Stockage des émissions
       */
      entries: IEventDispatcherEntries<Scheme>;
      /**
       * Ecouter une émission de l'émetteur
       * @description Ecouteur d'évèvements par rapport à un "SLUG". Utiliser un retour "TRUE" pour stopper la propagation de l'instance déclenchée
       * @param type Type d'émission déclaré dans le `Scheme` de l'instanciation
       * @param callback Fonction de rappel content en `argument[0]` les données définit par le dispatcher
       * @example emitter.listen<ReturnType>( 'emitterNameInKeyOfScheme', ( data : ReturnType ) => ... )
       */
      listen<I extends keyof Scheme>(type: I, callback: IEventDispatcherCallback<Scheme[I]>, force?: boolean | undefined): this;
      /**
       * Déclencheur un type d'émission de l'émetteur
       * @description Déclencheur les écouteurs par rapport au `type`
       * @param type Type d'émission déclaré dans le `Scheme` de l'instanciation
       * @param data Donnée à renvoyer aux écouteurs d'émission de l'émeteur
       * @example emitter.dispatch( 'emitterNameInKeyOfScheme', ... )
       *
       */
      dispatch(type: keyof Scheme, data: any): this;
  }

}
declare module '@protorians/core/framerate-easings' {
  import EventDispatcher from "@protorians/core/event-dispatcher";
  import { IEasingEmitterScheme, IEasingFormula } from "@protorians/core/types";
  export class FrameRateEasing {
      #private;
      /**
       * Emetteur
       */
      emitter: EventDispatcher<IEasingEmitterScheme>;
      /**
       * Name of easing
       */
      get name(): string;
      /**
       * Courbe pour CSS
       */
      get cubicBezier(): string;
      /**
       * Formule mathématique
       */
      get formula(): IEasingFormula;
      constructor(name: string, cubicBezier: string, formula: IEasingFormula);
      /**
       * Calculate from formula function
       * @param x Hit's Value
       */
      value(x: number): number;
      /**
       * Get cubic bezier value
       */
      property(): string;
  }
  export default class FrameRateEasings {
      /**
       * @see https://easings.net/#easeInSine
       */
      static get InSine(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutSine
       */
      static get OutSine(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutSine
       */
      static get InOutSine(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInQuad
       */
      static get InQuad(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutQuad
       */
      static get OutQuad(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutQuad
       */
      static get InOutQuad(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInCubic
       */
      static get InCubic(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutCubic
       */
      static get OutCubic(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutCubic
       */
      static get InOutCubic(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInQuart
       */
      static get InQuart(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutQuart
       */
      static get OutQuart(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutQuart
       */
      static get InOutQuart(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInQuint
       */
      static get InQuint(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutQuint
       */
      static get OutQuint(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutQuint
       */
      static get InOutQuint(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInExpo
       */
      static get InExpo(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutExpo
       */
      static get OutExpo(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutExpo
       */
      static get InOutExpo(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInCirc
       */
      static get InCirc(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutCirc
       */
      static get OutCirc(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutCirc
       */
      static get InOutCirc(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInBack
       */
      static get InBack(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutBack
       */
      static get OutBack(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutBack
       */
      static get InOutBack(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInElastic
       */
      static get InElastic(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutElastic
       */
      static get OutElastic(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutElastic
       */
      static get InOutElastic(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInBounce
       */
      static get InBounce(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeOutBounce
       */
      static get OutBounce(): FrameRateEasing;
      /**
       * @see https://easings.net/#easeInOutBounce
       */
      static get InOutBounce(): FrameRateEasing;
  }

}
declare module '@protorians/core/framerate-engine' {
  import type { IFrameRate, IFrameRateEmitterScheme, IFrameRateOptions, IFrameRatePlayload, IFrameRateProps, IFrameRatesStateCallback, IFrameRates } from "@protorians/core/types";
  import { ModelComposite } from "@protorians/core/composite";
  import Climbing from "@protorians/core/climbing";
  import EventDispatcher from "@protorians/core/event-dispatcher";
  export class FrameRate implements IFrameRate {
      #private;
      emitter: EventDispatcher<IFrameRateEmitterScheme>;
      get handler(): number | undefined;
      get options(): IFrameRateOptions;
      get rawdelta(): number;
      get delta(): number;
      get sens(): boolean;
      get paused(): boolean;
      get stopped(): boolean;
      constructor(options: IFrameRateOptions);
      get payload(): IFrameRatePlayload;
      syncronizeValue(x: number): number;
      reset(): this;
      stop(): this;
      start(): this;
      asyncStart(): Promise<IFrameRate>;
  }
  export default class FrameRates extends ModelComposite<IFrameRateProps> implements IFrameRates {
      #private;
      /**
       * Jeu d'escalade pour l'excetion consécutive
       */
      climbing: Climbing<IFrameRate> | undefined;
      constructor(props: IFrameRateProps);
      reset(): this;
      startParallel(callback?: IFrameRatesStateCallback): this;
      startConsecutive(callback?: IFrameRatesStateCallback): this;
      /**
       * Démarrage des FrameRates
       */
      start(callback?: IFrameRatesStateCallback): this;
  }

}
declare module '@protorians/core/index' {
  import * as CoumpoundClimbing from '@protorians/core/climbing';
  import * as CoumpoundComposite from '@protorians/core/composite';
  import * as CompoundMetricRandom from '@protorians/core/metric';
  import * as CompoundNavigation from '@protorians/core/navigation';
  import * as FrameRatesEngine from '@protorians/core/framerate-engine';
  import * as FrameRateEasing from '@protorians/core/framerate-easings';
  import * as EventDispatchers from '@protorians/core/event-dispatcher';
  import * as ElementAnimate from '@protorians/core/animation';
  import * as CoreAttribute from '@protorians/core/attribute';
  import * as CoreAppearance from '@protorians/core/appearance';
  import * as Utilities from '@protorians/core/utilities';
  const _default: {
      FrameRates: {
          Engine: typeof FrameRatesEngine;
          Easing: typeof FrameRateEasing;
      };
      Utilities: typeof Utilities;
      Compound: {
          Climbing: typeof CoumpoundClimbing;
          Composite: typeof CoumpoundComposite;
          MetricRandom: typeof CompoundMetricRandom;
          Navigation: typeof CompoundNavigation;
      };
      Element: {
          Animate: typeof ElementAnimate;
          Attribute: typeof CoreAttribute;
          Appearance: typeof CoreAppearance;
      };
      Events: {
          Dispatcher: typeof EventDispatchers;
      };
  };
  export default _default;

}
declare module '@protorians/core/metric' {
  export class MetricRandom {
      static ALPHA_NUMERIC: string;
      static ALPHA_NUMERIC_LOWER: string;
      static ALPHA_NUMERIC_UPPER: string;
      static ALPHA_UPPER: string;
      static ALPHA_LOWER: string;
      static HEX_UPPER: string;
      static HEX_LOWER: string;
      static NUMERIC: string;
      static CreateRandom(min: number, max: number): number;
      static CreateBlock(base: string, length: number): string[];
      static CreateAplpha(length: number): string[];
      static CreateHEX(length: number): string[];
      static CreateNumeric(length: number): string[];
      static Create(length: number): string[];
  }

}
declare module '@protorians/core/navigation' {
  import type { IEventDispatcher, INavigation, INavigationEmitterScheme, INavigationMiddlewareCallback, INavigationOptions } from "@protorians/core/types";
  /**
   * Système de navigation
   */
  export class Navigation<Scheme> implements INavigation<Scheme> {
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

}
declare module '@protorians/core/presenters' {
  import { HTMLComposite } from "@protorians/core/composite";
  import EventDispatcher from "@protorians/core/event-dispatcher";
  import type { IAppearance, IPresenters, IPresenterProps, IPresenter, IPresenterCardProps, IPresenterModalProps, IPresenterEventScheme, ModalPresenterEventScheme, IPresentersEventScheme, CardPresenterEventScheme, IEventDispatcher, OverlayPresenterEventScheme, IModalPresenter, ICardPresenter, IOverlayPresenter, IPresenterOverlayProps, IPresenterAction, IPresenterSize, IPresenterAxes } from "@protorians/core/types";
  export class Presenter<T extends IPresenterProps> extends HTMLComposite<T> implements IPresenter<T> {
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
  export class CardPresenter extends Presenter<IPresenterCardProps> implements ICardPresenter {
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
  export class ModalPresenter extends Presenter<IPresenterModalProps> implements IModalPresenter {
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
  export class OverlayPresenter extends Presenter<IPresenterOverlayProps> implements IOverlayPresenter {
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
  export default class Presenters<P extends IPresenterProps> implements IPresenters<P> {
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

}
declare module '@protorians/core/transitions' {
  import type { IElementTarget, ICoreTransition, IAnimationStateCallback, ICoreTransitionProps, IAnimationCalibrate } from '@protorians/core/types';
  import { ModelComposite } from '@protorians/core/composite';
  export class CoreTransition extends ModelComposite<ICoreTransitionProps> implements ICoreTransition {
      currentMoment?: boolean;
      constructor(props: ICoreTransitionProps);
      calibrate(moment: 'in' | 'out', property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      calibrateIn(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      calibrateOut(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      startIn(target: IElementTarget, callback?: IAnimationStateCallback): this;
      startOut(target: IElementTarget, callback?: IAnimationStateCallback): this;
      toggle(target: IElementTarget, callback?: IAnimationStateCallback): this;
  }
  export class CoreTransitions {
      #private;
      static get duration(): number;
      static set duration(value: number);
      /**
       * Fade Transition
       */
      static get Fade(): ICoreTransition;
      /**
       * Cards
       */
      static get Card(): ICoreTransition;
      /**
       * Zoom Transition
       */
      static get Zoom(): ICoreTransition;
      /**
       * Zoom Faded Transition
       */
      static get ZoomFaded(): ICoreTransition;
      /**
       * SlideHorizontal  Transition avec fondu
       */
      static get SlideFadedHorizontal(): ICoreTransition;
      /**
       * SlideHorizontal  Transition
       */
      static get SlideHorizontal(): ICoreTransition;
      /**
       * SlideVertical  Transition avec fondu
       */
      static get SlideFadedVertical(): ICoreTransition;
      /**
       * SlideVertical  Transition
       */
      static get SlideVertical(): ICoreTransition;
      /**
       * SlideHorizontalReverse  Transition avec fondu
       */
      static get SlideFadedHorizontalReverse(): ICoreTransition;
      /**
       * SlideHorizontal  Transition
       */
      static get SlideHorizontalReverse(): ICoreTransition;
      /**
       * SlideVertical  Transition avec fondu
       */
      static get SlideFadedVerticalReverse(): ICoreTransition;
      /**
       * SlideVerticalReverse  Transition
       */
      static get SlideVerticalReverse(): ICoreTransition;
  }

}
declare module '@protorians/core/types' {
  export type IElementTarget = HTMLElement | null;
  export type ISchemaValidator = {
      value: IDataValue;
      expert: IDataValue;
      valid: boolean;
  };
  export type ISchemaValidators = {
      score: number;
      hit: number;
      total: number;
      responses: ISchemaValidator[];
  };
  export type IObjectData = {
      [K: string]: IDataValue;
  };
  export type IDataValue = string | number | boolean | object;
  export type IObjectToString = {
      eq?: string | undefined;
      start?: string | undefined;
      end?: string | undefined;
      joiner?: string | undefined;
  };
  export interface ICoreTransition {
      currentMoment?: boolean;
      startIn(target: IElementTarget, callback?: IAnimationStateCallback): this;
      startOut(target: IElementTarget, callback?: IAnimationStateCallback): this;
      toggle(target: IElementTarget, callback?: IAnimationStateCallback): this;
      calibrate(moment: 'in' | 'out', property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      calibrateIn(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      calibrateOut(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
  }
  export type ICoreTransitionProps = {
      in: ICoreAnimation;
      out: ICoreAnimation;
  };
  export type IAnimationStateCallback = (payload: IAnimationStatePayload) => void;
  export type IAnimationCalibrate = {
      from: number;
      to: number;
      duration: number;
      ease: IEasing;
  };
  export type ICoreAnimationFeatureCallback = (payload: ICoreAnimationFeaturePayload) => string;
  export type IAnimationStatePayload = {
      animate: ICoreAnimation;
      target: IElementTarget;
  };
  export type ICoreAnimationFeaturePayload = {
      value: number;
      percent: number;
  };
  export type ICoreAnimationFeature = {
      from: number;
      to: number;
      duration: number;
      ease?: IEasing | undefined;
      set: ICoreAnimationFeatureCallback;
  };
  export type ICoreAnimationFeatures = {
      [K in keyof Partial<CSSStyleDeclaration>]: ICoreAnimationFeature;
  };
  export type ICoreAnimationOptions = {
      parallel?: boolean;
      infinite?: boolean;
  };
  export interface ICoreAnimation {
      get features(): ICoreAnimationFeatures;
      start(target: IElementTarget, callback?: IAnimationStateCallback): this;
      calibrate(feature: keyof ICoreAnimationFeatures, property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      calibrates(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
      reset(target: IElementTarget): this;
  }
  export type IClimbingTask<R> = Generator<Promise<R>, void, IClimbingNext<R>>;
  export type IClimbingYield<R> = (index: number) => IClimbingTask<R>;
  export type IClimbingAsyncTask<R> = (index: number) => Promise<R> | undefined;
  export type IClimbingNext<R> = ((instance: IClimbing<R>) => any) | undefined;
  export interface IClimbing<R> {
      responses: Array<R>;
      prepared: IClimbingTask<R> | undefined;
      yield: IClimbingYield<R>;
      trigger(done: IClimbingNext<R>, start?: number): this;
      create(entries: Array<R>, callback: IClimbingAsyncTask<R>): IClimbingYield<R>;
      next(prepared: IClimbingTask<R>, next: IClimbingNext<R>): boolean;
  }
  export type IProp = any;
  /**
   * IProps
   * @description définition des propriétés de base
   */
  export interface IProps {
      [P: string]: IProp;
  }
  export interface IModelComposite<P> {
      get properties(): P;
      property(name: keyof P): P[keyof P] | undefined;
      setProperty(name: keyof P, value: P[keyof P]): this;
  }
  /**
   * Emitter
   */
  export type IEventDispatcherCallback<I> = (payload: I) => void | boolean;
  export type IEventDispatcherEntry = {
      force?: boolean;
      callback: IEventDispatcherCallback<any>;
  };
  export type IEventDispatcherEntries<Scheme extends IEventDispatcherScheme> = {
      [K in keyof Scheme]: IEventDispatcherEntry[];
  };
  export type IEventDispatcherProgations<Scheme extends IEventDispatcherScheme> = {
      [K in keyof Scheme]: boolean;
  };
  export interface IEventDispatcherScheme {
      [K: string]: any;
  }
  export interface IEventDispatcher<Scheme extends IEventDispatcherScheme> {
      propagations: IEventDispatcherProgations<Scheme>;
      entries: IEventDispatcherEntries<Scheme>;
      listen<I extends keyof Scheme>(type: I, callback: IEventDispatcherCallback<Scheme[I]>, force?: boolean): this;
      dispatch(type: keyof Scheme, data?: any): this;
  }
  /**
   * Animates Engine
   */
  export type IFrameRateStateCallback = () => void;
  export type IFrameRatesStateCallback = (instance: IFrameRates) => void;
  export type IFrameRateFramePayload = {
      percent: number;
      value: number;
  };
  export type IFrameRateFrameCallback = (payload: IFrameRateFramePayload) => void;
  export type IFrameRateOptions = {
      from: number;
      to: number;
      duration: number;
      frame: IFrameRateFrameCallback;
      ease?: IEasing;
  };
  export type IFrameRatePlayload = {
      started?: number;
      elapsed?: number;
      previous?: number;
  };
  export type IFrameRateEmitterScheme = {
      reset: IFrameRate;
      prepare: IFrameRate;
      start: IFrameRate;
      frame: IFrameRate;
      done: IFrameRate;
      updateElapsed: IFrameRate;
      checkEnding: IFrameRate;
  };
  export interface IFrameRate {
      get options(): IFrameRateOptions;
      get delta(): number;
      get rawdelta(): number;
      get sens(): boolean;
      get payload(): IFrameRatePlayload;
      emitter: IEventDispatcher<IFrameRateEmitterScheme>;
      start(): this;
      asyncStart(): Promise<IFrameRate>;
      reset(): this;
      syncronizeValue(value: number): number;
  }
  export type IFrameRateProps = {
      parallel?: boolean;
      infinite?: boolean;
      entries: IFrameRate[];
  };
  export interface IFrameRates {
      start(callback?: IFrameRatesStateCallback): this;
      startConsecutive(callback?: IFrameRatesStateCallback): this;
      startParallel(callback?: IFrameRatesStateCallback): this;
      reset(): this;
  }
  export interface IEasingEmitterScheme {
      make: {
          value: number;
          ease: IEasing;
      };
  }
  export type IEasingFormula = (x: number) => number;
  export interface IEasing {
      get emitter(): IEventDispatcher<IEasingEmitterScheme>;
      get name(): string;
      get cubicBezier(): string;
      get formula(): IEasingFormula;
      value(x: number): number;
      property(): string;
  }
  export type ICoreAttributesMapValues = ICoreAttributesMap | Array<any> | string | number | boolean | null | (() => void);
  export type ICoreAttributesMap = {
      [A: string]: ICoreAttributesMapValues;
  };
  export type ICoreAttributesAunrsed = {
      [A: string]: string;
  };
  export type ICoreAttributesToggleMap = {
      [A: string]: boolean;
  };
  export type ICoreAttributeSyncAunyload = {
      entries: string[];
  };
  export type ICoreAttributeAddAunyload = {
      added: string;
  };
  export type ICoreAttributeRemoveAunyload = {
      removed: string;
  };
  export type ICoreAttributeReplaceAunyload = {
      older: string;
      newer: string;
  };
  export type ICoreAttributeUnlinkAunyload = {
      value: string[] | string;
  };
  export type ICoreAttributesEmitterScheme = {
      sync: ICoreAttributeSyncAunyload;
      add: ICoreAttributeAddAunyload;
      remove: ICoreAttributeRemoveAunyload;
      replace: ICoreAttributeReplaceAunyload;
      link: ICoreAttribute;
      unlink: ICoreAttributeUnlinkAunyload;
      unlinks: ICoreAttribute;
  };
  export interface ICoreAttribute {
      attributeName: string;
      get entries(): string[];
      get value(): string;
      sync(attribute?: string): this;
      add(value: string): this;
      remove(value: string): this;
      replace(older: string, value: string): this;
      contains(value: string): boolean;
      link(): this;
      unlink(property?: string | string[]): this;
  }
  export interface IAppearanceEmitterScheme {
      ready: IAppearance;
      insertProperties: IAppearanceObject;
      removeProperties: IAppearanceObjectDestroyed;
      set: IAppearanceObject;
      unset: IAppearanceObjectDestroyed;
      mount: IAppearance;
      sync: IAppearance;
      destroy: undefined;
  }
  export type IAppearanceValues = string | number | undefined;
  export interface IAppearanceCSSDeclaration extends Partial<CSSStyleDeclaration> {
      paddingVertical?: IAppearanceValues;
      paddingHorizontal?: IAppearanceValues;
      marginVertical?: IAppearanceValues;
      marginHorizontal?: IAppearanceValues;
  }
  export type IAppearanceObjectExtended = {
      backdropFilter?: string;
  };
  export type IAppearanceObject = IAppearanceObjectExtended & {
      [K in keyof Partial<IAppearanceCSSDeclaration>]: IAppearanceValues;
  };
  export interface IAppearanceStyleSheet {
      [Selector: string]: IAppearanceObject;
  }
  export type IAppearanceObjectDestroyed = Array<keyof IAppearanceObject>;
  export interface IAppearance {
      instance: HTMLStyleElement;
      uid: string;
      properties: IAppearanceObject;
      emitter: IEventDispatcher<IAppearanceEmitterScheme>;
      inject(code: string | string[]): this;
      insertProperties(properties: IAppearanceObject, data: IAppearanceObject): IAppearanceObject;
      removeProperties(properties: IAppearanceObject, payload: IAppearanceObjectDestroyed): IAppearanceObject;
      sheet(stylesheet: IAppearanceStyleSheet): this;
      set(payload: IAppearanceObject): this;
      unset(payload: IAppearanceObjectDestroyed): this;
      mount(): this;
      mountImmediat(): this;
      sync(): this;
      destroy(): this;
  }
  export type INavigationNavigateParser = 'hashtag' | 'directory';
  export type INavigationNavigateProps<Scheme> = {
      navigation: INavigation<Scheme>;
      routeName: keyof Scheme;
      parser: INavigationNavigateParser;
  };
  export type INavigationMiddlewareProps<Scheme> = {
      navigation: INavigation<Scheme>;
      event: Event | undefined;
      parser: INavigationNavigateParser;
      routeName: keyof Scheme;
      props: Scheme[keyof Scheme] | IProps | undefined;
  };
  export type INavigationMiddlewareCallback<Scheme> = (payload: INavigationMiddlewareProps<Scheme>) => void;
  export type INavigationOptions<Scheme> = {
      useHashtagParser?: boolean;
      capture?: boolean;
      middlewares?: INavigationMiddlewareCallback<Scheme>[];
  };
  export interface INavigationEmitterScheme<Scheme> {
      options: INavigation<Scheme>;
      navigate: INavigationNavigateProps<Scheme>;
  }
  export interface INavigation<Scheme> {
      emitter: IEventDispatcher<INavigationEmitterScheme<Scheme>>;
      options: INavigationOptions<Scheme>;
      setOptions(options: INavigationOptions<Scheme>): this;
      setOption(optionName: keyof INavigationOptions<Scheme>, value: (INavigationMiddlewareCallback<Scheme>[] & boolean) | undefined): this;
      middleware(middleware: INavigationMiddlewareCallback<Scheme>): this;
      dispatchNavigate(ev?: PopStateEvent | undefined): this;
      capturesActions(): this;
      isExternalURL(url: string): boolean;
      parseElementCaptured(event: Event): HTMLElement | undefined;
      currentRouteName(): keyof Scheme;
      oldRouteName(): keyof Scheme | undefined;
      currentQuery<T>(): T | undefined;
      observe(): this;
      navigate(route: keyof Scheme, props?: Scheme[keyof Scheme], ev?: PopStateEvent): this;
  }
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
  export interface IPresenter<P extends IPresenterProps> extends ILayerComposite<HTMLElement>, IModelComposite<P> {
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
  export type ILayerComposites<Layer> = {
      [k: string]: Layer;
  };
  export interface ILayerComposite<Layer> {
      get layer(): Layer;
      layers: ILayerComposites<Layer>;
      initialize(): this;
      createLayer(identifier: string, tagname?: keyof HTMLElementTagNameMap): this;
      removeLayer(identifier: string): this;
      render(): Layer;
      append(child?: ILayerCompositeChild<Layer>): this;
      appendElement(child?: Layer): this;
  }
  export interface ILayerCompositeChild<Layer> extends ILayerComposite<Layer> {
      parent?: ILayerComposite<Layer>;
      plug(parent: ILayerComposite<Layer>): this;
  }

}
declare module '@protorians/core/utilities' {
  import type { ICoreAttributesMap, ICoreAttributesMapValues, IObjectToString } from "@protorians/core/types";
  /**
   * URLParamsObject
   * @param searchParams Chaine de caractère des paramètres
   */
  export function URLParamsObject<T>(searchParams: string): T | undefined;
  export function ObjectURLParams<T extends object>(params: T): string;
  /**
   * BrowseDOMPath
   * @description Parcour l'arbre de parent d'un element. Une fonction de validation peut stopper le parcour en retournant true. Chaque parent parcourut est renvoyer via la fonction de validation
   * @param child Element à parcourir
   * @param validator Fonction de validation
   * @example
   * BrowseDOMPath( element, ( parent ) => ... )
   */
  export function AscendingDOMPath<T extends Node | HTMLElement>(child: T, validator: (parent: T) => boolean): T | undefined;
  /**
   * UpdateObject
   * @description Mise à jour d'un objet à partir d'un autre objet
   * @param originalObject Object original
   * @param parameters À injecter
   */
  export function UpdateObject<T>(originalObject: T, parameters?: Partial<T> | undefined): T;
  /**
   * AttributesValuesAunrser
   * @description Analyse et donne la valeur en fonction du type
   * @param value Valeur de l'attribute
   * @example AttributesValuesAunrser( data )
   */
  export function AttributesValuesAunrser(value: ICoreAttributesMapValues): ICoreAttributesMapValues;
  /**
   * AttributesObject
   * @param attributes Charge utile
   * @param ns nom de l'espace — `ui:button="success"`
   * @param separator Chaine de caratère entre le nom d'espace et le nom de l'attribut
   */
  export function AttributesObject<T extends ICoreAttributesMap>(attributes: ICoreAttributesMap, ns?: string | undefined, separator?: string | undefined): T;
  export function ObjectToString(payload: object, c?: IObjectToString): string;
  /**
   * SafeText
   * @description Désactiver les crochets et quotes dans du texte
   */
  export function safeText(text: string): string;
  /**
   * SafeText
   * @description Activer les crochets et quotes dans du texte
   */
  export function unSafeText(text: string): string;
  /**
   * addSlashes
   * @description Désactiver les crochets et quotes dans du texte
   */
  export function AddSlashes(text: string): string;
  /**
   * stripSlashes
   * @description Désactiver les crochets et quotes dans du texte
   */
  export function StripSlashes(text: string): string;
  /**
   * uncamelize
   */
  export function UnCamelize(value: string): string;
  /**
   * camelize
   */
  export function Camelize(value: string): string;
  export function fixExponent(x: number): string;
  export function DateTimeIsOver(from: string, to: string): boolean;

}
declare module '@protorians/core' {
  import main = require('@protorians/core/index');
  export = main;
}