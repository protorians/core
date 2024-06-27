import { EventDispatcher } from "./event-dispatcher";
import { IEasingEmitterScheme, IEasingFormula } from "../types";
export declare class FrameRateEasing {
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
export declare class FrameRateEasings {
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
