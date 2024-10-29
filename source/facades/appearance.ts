import type {IAppearanceStyleSheet} from "../types/appearance";
import {CoreAppearance} from "../supports/appearance";


export function createAppearance(stylesheet: IAppearanceStyleSheet) {
  return useAppearance().sheet(stylesheet)
}
export function useAppearance() {
  return (new CoreAppearance())
}