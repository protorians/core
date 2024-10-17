import {Navigation} from "../supports";
import {INavigationMiddlewareCallback} from "../types";

export function createNavigation<Scheme>(middleware?: INavigationMiddlewareCallback<Scheme>) {
  const navigation = (new Navigation<Scheme>());
  return middleware ? navigation.middleware(middleware) : navigation;
}