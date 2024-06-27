import type { ICoreAnimation, ICoreAnimationFeatures, ICoreAnimationOptions, IElementTarget, IAnimationStateCallback, IAnimationCalibrate } from '../types';
export declare class CoreAnimation implements ICoreAnimation {
    #private;
    get features(): ICoreAnimationFeatures;
    constructor(features: ICoreAnimationFeatures, options?: ICoreAnimationOptions);
    calibrate(feature: keyof ICoreAnimationFeatures, property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
    calibrates(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
    reset(target: IElementTarget): this;
    start(target: IElementTarget, callback?: IAnimationStateCallback): this;
}
