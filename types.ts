


export type IElementTarget = HTMLElement | null;




export interface IElementTransition {

  currentMoment ?: boolean;

  startIn( target : IElementTarget ) : this;

  startOut( target : IElementTarget ) : this;
  
  toggle( target : IElementTarget ) : this;
  
}

export type IElementTransitionProps = {

  in: IElementAnimation;

  out: IElementAnimation;

}

export type IElementAnimationFeatureCallback = ( payload : IElementAnimationFeaturePayload ) => string;

export type IElementAnimationFeaturePayload = {

  value: number;

  percent: number;
  
}

export type IElementAnimationFeature = {

  from: number;

  to: number;
  
  duration: number;

  ease?: IEasing | undefined

  set: IElementAnimationFeatureCallback;
  
}

export type IElementAnimationFeatures = {

  [ K in keyof Partial<CSSStyleDeclaration> ] : IElementAnimationFeature

}

export type IElementAnimationOptions = {

  parallel ?: boolean,

  infinite ?: boolean,
  
}

export interface IElementAnimation {

  get features() : IElementAnimationFeatures;

  start( target : IElementTarget ) : this;

}




export type IClimbingTask<R> = Generator<Promise<R>, void, IClimbingNext<R>>;

export type IClimbingYield<R> = ( index: number ) => IClimbingTask<R>;

export type IClimbingAsyncTask<R> = ( index: number ) => Promise<R> | undefined;

export type IClimbingNext<R> = (( instance : IClimbing<R> ) => any) | undefined;




export interface IClimbing<R>{

  responses : Array<R>

  prepared : IClimbingTask<R> | undefined;

  yield : IClimbingYield<R>;

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

  [ P : string ] : IProp

}


export interface ICompositeModel{

  get properties() : IProps;

  property( name : string ) : IProps[ keyof IProps ] | undefined;

}




/**
 * Emitter
 */
export type IEventDispatcherCallback<I> = ( payload : I ) => void | boolean;



export type IEventDispatcherEntry = {

  force ?: boolean;

  callback : IEventDispatcherCallback<any>
  
}

export type IEventDispatcherEntries<Scheme extends IEventDispatcherScheme> = {

  [ K in keyof Scheme ] : IEventDispatcherEntry[]
  
}


export type IEventDispatcherProgations<Scheme extends IEventDispatcherScheme> = {

  [ K in keyof Scheme ] : boolean
  
}

export interface IEventDispatcherScheme{

  [ K : string ] : any
  
}

export interface IEventDispatcher<Scheme extends IEventDispatcherScheme>{

  propagations : IEventDispatcherProgations<Scheme>;

  entries : IEventDispatcherEntries<Scheme>;

  listen<I extends keyof Scheme>( type : I, callback : IEventDispatcherCallback<Scheme[ I ]>, force ?: boolean ) : this;

  dispatch( type : keyof Scheme, data ?: any ) : this;
  
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

export type IFrameRateFrameCallback = ( payload : IFrameRateFramePayload ) => void;

export type IFrameRateOptions = {

  from : number;

  to: number;

  duration : number;

  frame: IFrameRateFrameCallback;

  ease ?: IEasing

}

export type IFrameRatePlayload = {

  started ?: number;

  elapsed ?: number;

  previous ?: number;
  
}


export type IFrameRateEmitterScheme = {

  reset: IFrameRate;

  prepare: IFrameRate;

  start: IFrameRate;

  frame: IFrameRate;

  done: IFrameRate;

  updateElapsed: IFrameRate;

  checkEnding: IFrameRate;
  
}


export interface IFrameRate{

  get options() : IFrameRateOptions;
  
  get delta() : number;

  get sens() : boolean;

  get payload() : IFrameRatePlayload;

  emitter: IEventDispatcher<IFrameRateEmitterScheme>;

  start() : this;

  asyncStart() : Promise<IFrameRate>;

  reset() : this;

  syncronizeValue( value : number ) : number;
  
}

export type IFrameRateProps = {

  parallel?: boolean;

  infinite?: boolean;

  entries: IFrameRate[]
  
}

export interface IFrameRates{

  start() : this;
  
}






export interface IEasingEmitterScheme{

  make: {

    value : number;

    ease: IEasing;
    
  }
  
}

export type IEasingFormula = ( x: number ) => number;

export interface IEasing{

  get emitter() : IEventDispatcher<IEasingEmitterScheme>;
  
  get name(): string;
  
  get cubicBezier() : string;

  get formula() : IEasingFormula;
  
  value( x: number ) : number;

  property() : string;
  
}