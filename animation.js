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
var _CoreAnimation_instances, _CoreAnimation_features, _CoreAnimation_frameRates, _CoreAnimation_options, _CoreAnimation_createFrameRatesEntries;
import FrameRates, { FrameRate } from './framerate-engine';
export class CoreAnimation {
    constructor(features, options) {
        _CoreAnimation_instances.add(this);
        _CoreAnimation_features.set(this, void 0);
        _CoreAnimation_frameRates.set(this, void 0);
        _CoreAnimation_options.set(this, void 0);
        __classPrivateFieldSet(this, _CoreAnimation_features, features, "f");
        __classPrivateFieldSet(this, _CoreAnimation_options, options || {}, "f");
    }
    get features() { return __classPrivateFieldGet(this, _CoreAnimation_features, "f"); }
    calibrate(feature, property, value) {
        if (this.features[feature] != undefined) {
            const calibrate = { ...__classPrivateFieldGet(this, _CoreAnimation_features, "f")[feature] };
            // @ts-ignore
            calibrate[property] = value;
            __classPrivateFieldGet(this, _CoreAnimation_features, "f")[feature] = calibrate;
        }
        return this;
    }
    calibrates(property, value) {
        Object.entries(__classPrivateFieldGet(this, _CoreAnimation_features, "f")).forEach(({ 0: name }) => {
            this.calibrate(name, property, value);
        });
        return this;
    }
    reset(target) {
        __classPrivateFieldSet(this, _CoreAnimation_frameRates, new FrameRates({
            parallel: __classPrivateFieldGet(this, _CoreAnimation_options, "f")?.parallel,
            infinite: __classPrivateFieldGet(this, _CoreAnimation_options, "f")?.infinite,
            entries: __classPrivateFieldGet(this, _CoreAnimation_instances, "m", _CoreAnimation_createFrameRatesEntries).call(this, target)
        }), "f");
        return this;
    }
    start(target, callback) {
        this.reset(target);
        if (__classPrivateFieldGet(this, _CoreAnimation_frameRates, "f")) {
            __classPrivateFieldGet(this, _CoreAnimation_frameRates, "f").start(() => {
                if (typeof callback == 'function')
                    callback({ animate: this, target, });
            });
        }
        return this;
    }
}
_CoreAnimation_features = new WeakMap(), _CoreAnimation_frameRates = new WeakMap(), _CoreAnimation_options = new WeakMap(), _CoreAnimation_instances = new WeakSet(), _CoreAnimation_createFrameRatesEntries = function _CoreAnimation_createFrameRatesEntries(target) {
    const entries = [];
    (Object.entries(__classPrivateFieldGet(this, _CoreAnimation_features, "f")).forEach(({ 0: property, 1: animation }) => {
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
