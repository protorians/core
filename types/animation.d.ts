import type { IEasing } from "./easing";
import type { IElementTarget } from "./value";
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
