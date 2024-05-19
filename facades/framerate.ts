import {Framerate, FrameRateEasing, FramerateCollection} from "../supports";
import type {IEasingFormula, IFramerateOptions, IFramerateProps} from "../types";

export function createFramerateEase(name: string, cubicBezier: string, formula: IEasingFormula){
  return (new FrameRateEasing(name, cubicBezier, formula))
}

export function framerate(options: IFramerateOptions){
  return (new Framerate(options))
}

export function framerateCollection(options: IFramerateProps){
  return (new FramerateCollection(options))
}