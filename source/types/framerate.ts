import type {IEasing} from "./easing";
import type {IEventDispatcher} from "./event";
import type {IClimbing} from "./climbing";


export type IFramerateStateCallback = () => void;

export type IFramerateCollectionStateCallback = (instance: IFramerateCollection) => void;

export type IFramerateFramePayload = {

  percent: number;

  value: number;

};

export type IFramerateFrameCallback = (payload: IFramerateFramePayload) => void;

export type IFramerateOptions = {

  from: number;

  to: number;

  duration: number;

  frame: IFramerateFrameCallback;

  ease?: IEasing

}

export type IFrameratePayload = {

  started?: number;

  elapsed?: number;

  previous?: number;

}


export type IFramerateEmitterScheme = {

  reset: IFramerate;

  prepare: IFramerate;

  start: IFramerate;

  frame: IFramerate;

  done: IFramerate;

  updateElapsed: IFramerate;

  checkEnding: IFramerate;

}


export interface IFramerate {

  get options(): IFramerateOptions;

  get delta(): number;

  get rawdelta(): number;

  get sens(): boolean;

  get payload(): IFrameratePayload;

  emitter: IEventDispatcher<IFramerateEmitterScheme>;

  start(): this;

  asyncStart(): Promise<IFramerate>;

  reset(): this;

  syncronizeValue(value: number): number;

}

export type IFramerateProps = {

  parallel?: boolean;

  infinite?: boolean;

  entries: IFramerate[]

}

export interface IFramerateCollection {

  climbing: IClimbing<IFramerate> | undefined;

  get history(): IFramerate[];

  start(callback?: IFramerateCollectionStateCallback): this;

  startConsecutive(callback?: IFramerateCollectionStateCallback): this;

  startParallel(callback?: IFramerateCollectionStateCallback): this;

  reset(): this;

}
