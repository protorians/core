import type { IElementTarget, ICoreTransition, IAnimationStateCallback, ICoreTransitionProps, IAnimationCalibrate } from '../types';
import { PropertiesBag } from './properties';
export declare class CoreTransition extends PropertiesBag<ICoreTransitionProps> implements ICoreTransition {
    currentMoment?: boolean;
    constructor(props: ICoreTransitionProps);
    calibrate(moment: 'in' | 'out', property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
    calibrateIn(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
    calibrateOut(property: keyof IAnimationCalibrate, value: IAnimationCalibrate[keyof IAnimationCalibrate]): this;
    startIn(target: IElementTarget, callback?: IAnimationStateCallback): this;
    startOut(target: IElementTarget, callback?: IAnimationStateCallback): this;
    toggle(target: IElementTarget, callback?: IAnimationStateCallback): this;
}
export declare class CoreTransitions {
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
