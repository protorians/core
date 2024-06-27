import { Framerate, FrameRateEasing, FramerateCollection } from "../supports";
import type { IEasingFormula, IFramerateOptions, IFramerateProps } from "../types";
export declare function createFramerateEase(name: string, cubicBezier: string, formula: IEasingFormula): FrameRateEasing;
export declare function framerate(options: IFramerateOptions): Framerate;
export declare function framerateCollection(options: IFramerateProps): FramerateCollection;
