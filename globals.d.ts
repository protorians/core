declare module '@protorians/core/compound.climbing' {
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
declare module '@protorians/core/compound.composite' {
  import type { ICompositeModel, IProps } from "@protorians/core/types";
  export class CompositeModel<P extends IProps> implements ICompositeModel {
      #private;
      get properties(): P;
      property(name: keyof P): P[keyof P] | undefined;
      constructor(props: P);
  }

}
declare module '@protorians/core/element.animate' {
  import type { IElementAnimation, IElementAnimationFeatures, IElementAnimationOptions, IElementTarget, IElementTransition, IElementTransitionProps } from '@protorians/core/types';
  import { CompositeModel } from '@protorians/core/compound.composite';
  export class ElementAnimation implements IElementAnimation {
      #private;
      get features(): IElementAnimationFeatures;
      constructor(features: IElementAnimationFeatures, options?: IElementAnimationOptions);
      reset(target: IElementTarget): this;
      start(target: IElementTarget): this;
  }
  export class ElementTransition extends CompositeModel<IElementTransitionProps> implements IElementTransition {
      currentMoment?: boolean;
      constructor(props: IElementTransitionProps);
      startIn(target: IElementTarget): this;
      startOut(target: IElementTarget): this;
      toggle(target: IElementTarget): this;
  }
  export class ElementTransitions {
      static get fade(): ElementTransition;
  }

}
declare module '@protorians/core/event.dispatcher' {
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
declare module '@protorians/core/framerate.easings' {
  import EventDispatcher from "@protorians/core/event.dispatcher";
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
declare module '@protorians/core/framerate.engine' {
  import type { IFrameRate, IFrameRateEmitterScheme, IFrameRateOptions, IFrameRatePlayload, IFrameRateProps, IFrameRates } from "@protorians/core/types";
  import { CompositeModel } from "@protorians/core/compound.composite";
  import Climbing from "@protorians/core/compound.climbing";
  import EventDispatcher from "@protorians/core/event.dispatcher";
  export class FrameRate implements IFrameRate {
      #private;
      emitter: EventDispatcher<IFrameRateEmitterScheme>;
      get handler(): number | undefined;
      get options(): IFrameRateOptions;
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
  export default class FrameRates extends CompositeModel<IFrameRateProps> implements IFrameRates {
      #private;
      /**
       * Jeu d'escalade pour l'excetion consécutive
       */
      climbing: Climbing<IFrameRate> | undefined;
      constructor(props: IFrameRateProps);
      reset(): this;
      startParallel(): this;
      startConsecutive(callback?: (instance: Climbing<IFrameRate>) => void): this;
      /**
       * Démarrage des FrameRates
       */
      start(): this;
  }

}
declare module '@protorians/core/index' {
  import * as CoumpoundClimbing from '@protorians/core/compound.climbing';
  import * as CoumpoundComposite from '@protorians/core/compound.composite';
  import * as ElementAnimate from '@protorians/core/element.animate';
  import * as FrameRatesEngine from '@protorians/core/framerate.engine';
  import * as EventDispatchers from '@protorians/core/event.dispatcher';
  import * as FrameRateEasing from '@protorians/core/framerate.easings';
  const _default: {
      FrameRates: {
          Engine: typeof FrameRatesEngine;
          Easing: typeof FrameRateEasing;
      };
      Compound: {
          Climbing: typeof CoumpoundClimbing;
          Composite: typeof CoumpoundComposite;
      };
      Element: {
          Animate: typeof ElementAnimate;
      };
      Events: {
          Dispatcher: typeof EventDispatchers;
      };
  };
  export default _default;

}
declare module '@protorians/core/types' {
  export type IElementTarget = HTMLElement | null;
  export interface IElementTransition {
      currentMoment?: boolean;
      startIn(target: IElementTarget): this;
      startOut(target: IElementTarget): this;
      toggle(target: IElementTarget): this;
  }
  export type IElementTransitionProps = {
      in: IElementAnimation;
      out: IElementAnimation;
  };
  export type IElementAnimationFeatureCallback = (payload: IElementAnimationFeaturePayload) => string;
  export type IElementAnimationFeaturePayload = {
      value: number;
      percent: number;
  };
  export type IElementAnimationFeature = {
      from: number;
      to: number;
      duration: number;
      ease?: IEasing | undefined;
      set: IElementAnimationFeatureCallback;
  };
  export type IElementAnimationFeatures = {
      [K in keyof Partial<CSSStyleDeclaration>]: IElementAnimationFeature;
  };
  export type IElementAnimationOptions = {
      parallel?: boolean;
      infinite?: boolean;
  };
  export interface IElementAnimation {
      get features(): IElementAnimationFeatures;
      start(target: IElementTarget): this;
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
  export interface ICompositeModel {
      get properties(): IProps;
      property(name: string): IProps[keyof IProps] | undefined;
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
   * Animate
   */
  /**
   * Animates Engine
   */
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
      start(): this;
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

}
declare module '@protorians/core' {
  import main = require('@protorians/core/index');
  export = main;
}