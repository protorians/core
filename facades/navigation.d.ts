import { Navigation } from "../supports";
import { INavigationMiddlewareCallback } from "../types";
export declare function createNavigation<Scheme>(middleware?: INavigationMiddlewareCallback<Scheme>): Navigation<Scheme>;
