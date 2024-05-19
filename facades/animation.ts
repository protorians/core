import type {ICoreAnimationFeatures, ICoreAnimationOptions} from "../types";
import {CoreAnimation} from "../supports";

export function createAnimation(features: ICoreAnimationFeatures, options?: ICoreAnimationOptions) {
  return (new CoreAnimation(features, options))
}