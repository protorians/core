var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Navigation_oldRoute;
import EventDispatcher from "./event-dispatcher";
import { AscendingDOMPath, ObjectURLParams, URLParamsObject, UpdateObject } from "./utilities";
/**
 * Système de navigation
 */
export class Navigation {
    constructor() {
        this.options = {};
        this.emitter = new EventDispatcher();
        _Navigation_oldRoute.set(this, void 0);
        this.options.middlewares = this.options.middlewares || [];
    }
    currentRouteName() {
        return (this.options.useHashtagParser ? (location.hash || '').split('?')[0] : location.pathname).substring(1);
    }
    oldRouteName() {
        return __classPrivateFieldGet(this, _Navigation_oldRoute, "f");
    }
    currentQuery() {
        if (this.options.useHashtagParser) {
            return URLParamsObject((location.hash || location.search || '').split('?')[1] || '');
        }
        else {
            return URLParamsObject(location.search);
        }
    }
    setOption(optionName, value) {
        this.options[optionName] = value;
        return this;
    }
    setOptions(options) {
        this.options = UpdateObject(this.options, options);
        this.emitter.dispatch('options', this);
        return this;
    }
    middleware(middleware) {
        this.options.middlewares?.push(middleware);
        return this;
    }
    observe() {
        window.addEventListener('popstate', ev => this.dispatchNavigate(ev));
        this.capturesActions();
        return this;
    }
    capturesActions() {
        if (this.options.capture) {
            document.body.addEventListener('click', (ev) => {
                const target = this.parseElementCaptured(ev);
                if (target && !target.hasAttribute('navigate:no-detection')) {
                    const url = target.getAttribute('href') || target.getAttribute('navigate:view') || target.getAttribute('navigate-view');
                    const blank = (target.getAttribute('target') || '').toLowerCase() == '_blank';
                    const external = url ? this.isExternalURL(url) : false;
                    if (url && !blank && !external) {
                        ev.preventDefault();
                        this.navigate(this.parseRouteName(url), {}, ev);
                    }
                }
            }, false);
        }
        return this;
    }
    parseRouteName(routeName) {
        const route = routeName.trim();
        const firstChar = route.substring(0, 1);
        return (firstChar == '/' || firstChar == '#') ? route.substring(1) : route;
    }
    isExternalURL(url) {
        return (url.match(/^http/gi) || url.match(/^\/\//gi)) ? true : false;
    }
    parseElementCaptured(ev) {
        if (ev.target instanceof HTMLElement) {
            if (ev.target.hasAttribute('navigate:view') || ev.target.tagName == "A") {
                return ev.target;
            }
            else {
                return AscendingDOMPath(ev.target, parent => parent.tagName == 'A' || parent.hasAttribute('navigate:view') ? true : false);
            }
        }
        return undefined;
    }
    dispatchNavigate(ev) {
        const routeName = this.currentRouteName();
        const parser = this.options.useHashtagParser ? 'hashtag' : 'directory';
        this.options.middlewares?.forEach(middleware => middleware({
            navigation: this,
            event: ev,
            routeName: this.currentRouteName(),
            props: this.currentQuery() || undefined,
            parser: this.options.useHashtagParser ? 'hashtag' : 'directory',
        }));
        this.emitter.dispatch('navigate', {
            navigation: this,
            routeName,
            parser: parser,
        });
        __classPrivateFieldSet(this, _Navigation_oldRoute, routeName, "f");
        return this;
    }
    navigate(route, props, ev) {
        if (!route) {
            return this;
        }
        const currentRoute = this.currentRouteName();
        const routeName = route;
        const hasProps = Object.keys(props || {}).length;
        const query = hasProps ? `?${ObjectURLParams(props || {})}` : '';
        if (currentRoute != routeName) {
            if (this.options.useHashtagParser) {
                location.hash = `${routeName}${query}`;
            }
            else {
                history.pushState(props || {}, document.title, `${routeName}${query}`);
                this.dispatchNavigate(ev || undefined);
            }
        }
        else {
            this.dispatchNavigate(ev || undefined);
        }
        return this;
    }
}
_Navigation_oldRoute = new WeakMap();
