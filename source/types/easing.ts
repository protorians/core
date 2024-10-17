import type {IEventDispatcher} from "./event";

export interface IEasingEmitterScheme {

  make: {

    value: number;

    ease: IEasing;

  }

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
