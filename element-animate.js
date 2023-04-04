var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ElementAnimation_instances, _ElementAnimation_features, _ElementAnimation_frameRates, _ElementAnimation_options, _ElementAnimation_createFrameRatesEntries;
import { CompositeModel } from './composite';
import FrameRates, { FrameRate } from './framerate-engine';
export class ElementAnimation {
    constructor(features, options) {
        _ElementAnimation_instances.add(this);
        _ElementAnimation_features.set(this, void 0);
        _ElementAnimation_frameRates.set(this, void 0);
        _ElementAnimation_options.set(this, void 0);
        __classPrivateFieldSet(this, _ElementAnimation_features, features, "f");
        __classPrivateFieldSet(this, _ElementAnimation_options, options || {}, "f");
    }
    get features() { return __classPrivateFieldGet(this, _ElementAnimation_features, "f"); }
    reset(target) {
        __classPrivateFieldSet(this, _ElementAnimation_frameRates, new FrameRates({
            parallel: __classPrivateFieldGet(this, _ElementAnimation_options, "f")?.parallel,
            infinite: __classPrivateFieldGet(this, _ElementAnimation_options, "f")?.infinite,
            entries: __classPrivateFieldGet(this, _ElementAnimation_instances, "m", _ElementAnimation_createFrameRatesEntries).call(this, target)
        }), "f");
        return this;
    }
    start(target) {
        this.reset(target);
        if (__classPrivateFieldGet(this, _ElementAnimation_frameRates, "f")) {
            __classPrivateFieldGet(this, _ElementAnimation_frameRates, "f").start();
        }
        return this;
    }
}
_ElementAnimation_features = new WeakMap(), _ElementAnimation_frameRates = new WeakMap(), _ElementAnimation_options = new WeakMap(), _ElementAnimation_instances = new WeakSet(), _ElementAnimation_createFrameRatesEntries = function _ElementAnimation_createFrameRatesEntries(target) {
    const entries = [];
    (Object.entries(__classPrivateFieldGet(this, _ElementAnimation_features, "f")).forEach(({ 0: property, 1: animation }) => {
        entries.push(new FrameRate({
            from: animation.from,
            to: animation.to,
            duration: animation.duration,
            ease: animation.ease,
            frame: (payload) => {
                if (target) {
                    const propertyValue = animation.set(payload);
                    target.style[property] = propertyValue;
                }
            }
        }));
    }));
    return entries;
};
export class ElementTransition extends CompositeModel {
    constructor(props) {
        super(props);
        this.currentMoment = undefined;
    }
    startIn(target) {
        this.currentMoment = true;
        this.properties.in.start(target);
        return this;
    }
    startOut(target) {
        this.currentMoment = false;
        this.properties.out.start(target);
        return this;
    }
    toggle(target) {
        if (this.currentMoment)
            this.startOut(target);
        else
            this.startIn(target);
        return this;
    }
}
export class ElementTransitions {
    static get fade() {
        return new ElementTransition({
            in: new ElementAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: 1000,
                    set: ({ value }) => `scale(${value / 100})`
                }
            }),
            out: new ElementAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: 1000,
                    set: ({ value }) => `scale(${value / 100})`
                }
            }),
        });
    }
}
