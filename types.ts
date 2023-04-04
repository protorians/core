


export type IElementTarget = HTMLElement | null;




export type IObjectToString = {

  eq ?: string | undefined;

  start ?: string | undefined;

  end ?: string | undefined;

  joiner ?: string | undefined;
  
}



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





export type IElementAttributesMapValues = IElementAttributesMap | Array<any> | string  | number | boolean | null | (() => void)

export type IElementAttributesMap = {

  [ A : string ] : IElementAttributesMapValues
  
}

export type IElementAttributesAunrsed = {

    [ A : string ] : string;
    
}

export type IElementAttributesToggleMap = {

    [ A : string ] : boolean;
    
}

export type IElementAttributeSyncAunyload = {
  
  entries: string[];

}

export type IElementAttributeAddAunyload = {
  
  added: string;

}

export type IElementAttributeRemoveAunyload = {
  
  removed: string;

}

export type IElementAttributeReplaceAunyload = {
  
  older: string;

  newer: string;

}

export type IElementAttributeUnlinkAunyload = {
  
  value: string[] | string;

}

export type IElementAttributesEmitterScheme = {

  sync: IElementAttributeSyncAunyload;

  add: IElementAttributeAddAunyload;

  remove: IElementAttributeRemoveAunyload;

  replace: IElementAttributeReplaceAunyload;

  link: IElementAttribute;
  
  unlink: IElementAttributeUnlinkAunyload;

  unlinks: IElementAttribute;

}

export interface IElementAttribute{

  attributeName : string;
  
  get entries() : string[];

  get value() : string;

  sync( attribute ?: string ) : this;

  add( value : string ) : this;

  remove( value : string ) : this;

  replace( older : string, value : string ) : this;

  contains( value : string ) : boolean;
  
  link() : this;

  unlink( property ?: string | string[] ) : this;
  
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

export type IAppearanceValues = string | number | undefined

export interface IAppearanceCSSDeclaration extends Partial<CSSStyleDeclaration>{

  paddingVertical ?: IAppearanceValues;
  
  paddingHorizontal ?: IAppearanceValues;
  
  marginVertical ?: IAppearanceValues;
  
  marginHorizontal ?: IAppearanceValues;
  
}

export type IAppearanceObject = {

  [ K in keyof Partial<IAppearanceCSSDeclaration> ] : IAppearanceValues;

}

export interface IAppearanceStyleSheet{

  [ Selector : string ] : IAppearanceObject;

}

export type IAppearanceObjectDestroyed =  Array<keyof IAppearanceObject>

export interface IAppearance{

  instance: HTMLStyleElement;

  uid : string;

  properties: IAppearanceObject; 

  emitter: IEventDispatcher<IAppearanceEmitterScheme>;

  insertProperties( 
    
    properties : IAppearanceObject, 
    
    data : IAppearanceObject 
    
  ) : IAppearanceObject;

  removeProperties( 
    
    properties : IAppearanceObject, 
    
    payload : IAppearanceObjectDestroyed 
    
  ) : IAppearanceObject

  sheet( stylesheet : IAppearanceStyleSheet ) : this;

  set( payload : IAppearanceObject ) : this;

  unset( payload : IAppearanceObjectDestroyed ) : this;

  mount() : this;

  mountImmediat() : this;

  sync() : this;

  destroy() : this;
  
}






export type INavigationNavigateParser = 'hashtag' | 'directory'

export type INavigationNavigateProps<Scheme> = {

  navigation: INavigation<Scheme>;

  routeName: keyof Scheme;
  
  parser: INavigationNavigateParser;

}

export type INavigationMiddlewareProps<Scheme> = {

  navigation: INavigation<Scheme>;

  event: Event | undefined;

  parser: INavigationNavigateParser;

  routeName: keyof Scheme;

  props: Scheme[ keyof Scheme ] | IProps | undefined;
  
}

export type INavigationMiddlewareCallback<Scheme> = ( 
  
  payload : INavigationMiddlewareProps<Scheme> 
  
) => void;


export type INavigationOptions<Scheme> = {

  useHashtagParser?: boolean;

  capture ?: boolean;

  middlewares?: INavigationMiddlewareCallback<Scheme>[]
  
}


export interface INavigationEmitterScheme<Scheme>{

  options: INavigation<Scheme>;

  navigate: INavigationNavigateProps<Scheme>;

} 


export interface INavigation<Scheme>{

  emitter: IEventDispatcher<INavigationEmitterScheme<Scheme>>

  options: INavigationOptions<Scheme>;

  setOptions( options: INavigationOptions<Scheme> ) : this;

  setOption( optionName: keyof INavigationOptions<Scheme>, value : (INavigationMiddlewareCallback<Scheme>[] & boolean) | undefined ) : this;

  middleware( middleware : INavigationMiddlewareCallback<Scheme> ) : this;

  dispatchNavigate( ev ?: PopStateEvent | undefined ) : this;

  capturesActions() : this;

  isExternalURL( url : string ) : boolean;

  parseElementCaptured( event : Event ) : HTMLElement | undefined;

  currentRouteName() : keyof Scheme;

  oldRouteName() : keyof Scheme | undefined;

  currentQuery<T>() : T | undefined;

  observe() : this;

  navigate( 
    
    route : keyof Scheme, 
    
    props ?: Scheme[ keyof Scheme ], 
    
    ev?: PopStateEvent 
    
  ) : this;
  
}