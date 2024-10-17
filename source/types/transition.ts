import type {IElementTarget} from "./value";
import type {IAnimationCalibrate, IAnimationStateCallback, ICoreAnimation} from "./animation";


export interface ICoreTransition {

  currentMoment?: boolean;

  startIn(target: IElementTarget, callback?: IAnimationStateCallback): this;

  startOut(target: IElementTarget, callback?: IAnimationStateCallback): this;

  toggle(target: IElementTarget, callback?: IAnimationStateCallback): this;

  calibrate(
    moment: 'in' | 'out',
    property: keyof IAnimationCalibrate,
    value: IAnimationCalibrate[keyof IAnimationCalibrate]
  ): this

  calibrateIn(
    property: keyof IAnimationCalibrate,
    value: IAnimationCalibrate[keyof IAnimationCalibrate]
  ): this

  calibrateOut(
    property: keyof IAnimationCalibrate,
    value: IAnimationCalibrate[keyof IAnimationCalibrate]
  ): this

}

export type ICoreTransitionProps = {

  in: ICoreAnimation;

  out: ICoreAnimation;

}

