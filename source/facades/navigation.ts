import type {INavigationMiddlewareCallback} from "../types/navigation";
import {Navigation} from "../supports/navigation";

export function createNavigation<Scheme>(middleware?: INavigationMiddlewareCallback<Scheme>) {
  const navigation = (new Navigation<Scheme>());
  return middleware ? navigation.middleware(middleware) : navigation;
}