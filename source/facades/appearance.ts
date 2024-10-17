import {CoreAppearance} from "../supports";
import type {IAppearanceStyleSheet} from "../types";

export function createAppearance(stylesheet: IAppearanceStyleSheet) {
  return useAppearance().sheet(stylesheet)
}
export function useAppearance() {
  return (new CoreAppearance())
}