"use strict";
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
var _Framerate_instances, _Framerate_options, _Framerate_current, _Framerate_status, _Framerate_paused, _Framerate_stopped, _Framerate_handler, _Framerate_initialize, _Framerate_prepare, _Framerate_elapsed, _Framerate_calculate, _Framerate_frame, _Framerate_playing;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FramerateCollection = exports.Framerate = void 0;
const supports_1 = require("../supports");
class Framerate {
    get handler() {
        return __classPrivateFieldGet(this, _Framerate_handler, "f");
    }
    get options() {
        return __classPrivateFieldGet(this, _Framerate_options, "f");
    }
    get rawdelta() {
        return (__classPrivateFieldGet(this, _Framerate_options, "f").to - __classPrivateFieldGet(this, _Framerate_options, "f").from);
    }
    get delta() {
        return Math.abs(__classPrivateFieldGet(this, _Framerate_options, "f").to - __classPrivateFieldGet(this, _Framerate_options, "f").from);
    }
    get sens() {
        return (__classPrivateFieldGet(this, _Framerate_options, "f").to - __classPrivateFieldGet(this, _Framerate_options, "f").from) > 0;
    }
    get paused() {
        return __classPrivateFieldGet(this, _Framerate_paused, "f");
    }
    get stopped() {
        return __classPrivateFieldGet(this, _Framerate_stopped, "f");
    }
    constructor(options) {
        _Framerate_instances.add(this);
        this.emitter = new supports_1.EventDispatcher();
        _Framerate_options.set(this, void 0);
        _Framerate_current.set(this, {});
        _Framerate_status.set(this, false);
        _Framerate_paused.set(this, false);
        _Framerate_stopped.set(this, false);
        _Framerate_handler.set(this, undefined);
        __classPrivateFieldSet(this, _Framerate_options, options, "f");
    }
    get payload() {
        return __classPrivateFieldGet(this, _Framerate_current, "f");
    }
    syncronizeValue(x) {
        return (__classPrivateFieldGet(this, _Framerate_options, "f").from > __classPrivateFieldGet(this, _Framerate_options, "f").to
            ? __classPrivateFieldGet(this, _Framerate_options, "f").from - x
            : x - __classPrivateFieldGet(this, _Framerate_options, "f").from);
        // return this.sens ? x : this.delta - x;
    }
    reset() {
        __classPrivateFieldGet(this, _Framerate_current, "f").started = undefined;
        __classPrivateFieldGet(this, _Framerate_current, "f").elapsed = undefined;
        __classPrivateFieldGet(this, _Framerate_current, "f").previous = undefined;
        __classPrivateFieldSet(this, _Framerate_status, false, "f");
        __classPrivateFieldSet(this, _Framerate_stopped, false, "f");
        this.emitter.dispatch('reset', this);
        return this;
    }
    // pause(){
    //   if(this.#handler) cancelAnimationFrame( this.#handler )
    //   this.#paused = true;
    //   return this;
    // }
    // resume(){
    //   this.#paused = false;
    //   this.#playing();
    //   return this;
    // }
    stop() {
        if (__classPrivateFieldGet(this, _Framerate_handler, "f"))
            cancelAnimationFrame(__classPrivateFieldGet(this, _Framerate_handler, "f"));
        __classPrivateFieldSet(this, _Framerate_stopped, true, "f");
        return this;
    }
    start() {
        var _a;
        return __classPrivateFieldGet((_a = __classPrivateFieldGet(this, _Framerate_instances, "m", _Framerate_initialize).call(this)), _Framerate_instances, "m", _Framerate_playing).call(_a);
    }
    asyncStart() {
        return new Promise((done) => {
            this.emitter.listen('done', engine => done(engine));
            this.start();
        });
    }
}
exports.Framerate = Framerate;
_Framerate_options = new WeakMap(), _Framerate_current = new WeakMap(), _Framerate_status = new WeakMap(), _Framerate_paused = new WeakMap(), _Framerate_stopped = new WeakMap(), _Framerate_handler = new WeakMap(), _Framerate_instances = new WeakSet(), _Framerate_initialize = function _Framerate_initialize() {
    return this.reset();
}, _Framerate_prepare = function _Framerate_prepare(time) {
    if (__classPrivateFieldGet(this, _Framerate_current, "f").started === undefined) {
        __classPrivateFieldGet(this, _Framerate_current, "f").started = time;
        this.emitter.dispatch('prepare', this);
    }
    return this;
}, _Framerate_elapsed = function _Framerate_elapsed(time) {
    if (typeof __classPrivateFieldGet(this, _Framerate_current, "f").started == 'number') {
        __classPrivateFieldGet(this, _Framerate_current, "f").elapsed = time - __classPrivateFieldGet(this, _Framerate_current, "f").started;
        this.emitter.dispatch('updateElapsed', this);
    }
    return this;
}, _Framerate_calculate = function _Framerate_calculate(time) {
    if (typeof __classPrivateFieldGet(this, _Framerate_current, "f").elapsed == 'number') {
        if (__classPrivateFieldGet(this, _Framerate_current, "f").previous !== time) {
            const time = Math.min(__classPrivateFieldGet(this, _Framerate_current, "f").elapsed, this.options.duration);
            const quotient = (time / this.options.duration);
            const complete = time >= this.options.duration;
            if (__classPrivateFieldGet(this, _Framerate_options, "f").ease) {
                const percent = __classPrivateFieldGet(this, _Framerate_options, "f").ease.value(quotient) * 100;
                const value = (percent * this.delta) / 100;
                __classPrivateFieldGet(this, _Framerate_options, "f").frame({
                    percent,
                    value: this.syncronizeValue(value)
                });
            }
            if (!__classPrivateFieldGet(this, _Framerate_options, "f").ease) {
                const percent = quotient * 100;
                const value = (((percent) * (this.delta)) / 100);
                // const master = 
                __classPrivateFieldGet(this, _Framerate_options, "f").frame({
                    percent,
                    value: this.syncronizeValue(value)
                });
            }
            if (complete) {
                __classPrivateFieldSet(this, _Framerate_status, true, "f");
                // this.#options.frame({ percent: 100, value: this.options.to })
                this.emitter.dispatch('done', this);
                return this;
            }
        }
        this.emitter.dispatch('checkEnding', this);
    }
    return this;
}, _Framerate_frame = function _Framerate_frame(time) {
    if (typeof __classPrivateFieldGet(this, _Framerate_current, "f").elapsed == 'number') {
        if (__classPrivateFieldGet(this, _Framerate_current, "f").elapsed < this.options.duration) {
            __classPrivateFieldGet(this, _Framerate_current, "f").previous = time;
            if (!__classPrivateFieldGet(this, _Framerate_status, "f")) {
                this.emitter.dispatch('frame', this);
                __classPrivateFieldSet(this, _Framerate_handler, requestAnimationFrame(__classPrivateFieldGet(this, _Framerate_instances, "m", _Framerate_playing).bind(this)), "f");
            }
        }
    }
    return this;
}, _Framerate_playing = function _Framerate_playing() {
    // if( this.paused ){
    //   console.warn('Pause, standby', this.#paused )
    // }
    // else if( this.#stopped ){
    //   console.error('Stop, reset now', this.#stopped )
    //   this.reset();
    // }
    // else{
    __classPrivateFieldSet(this, _Framerate_handler, requestAnimationFrame((time) => {
        // if( this.paused || this.#stopped ){
        var _a, _b, _c;
        //   console.log('standby', this.#current )
        // }
        // else{
        __classPrivateFieldGet((_a = __classPrivateFieldGet((_b = __classPrivateFieldGet((_c = __classPrivateFieldGet(this, _Framerate_instances, "m", _Framerate_prepare).call(this, time)), _Framerate_instances, "m", _Framerate_elapsed).call(_c, time)), _Framerate_instances, "m", _Framerate_calculate).call(_b, time)), _Framerate_instances, "m", _Framerate_frame).call(_a, time);
        // }
    }), "f");
    // }
    return this;
};
class FramerateCollection extends supports_1.PropertiesBag {
    get history() {
        return this.executed;
    }
    constructor(props) {
        super(props);
        /**
         * Jeu d'escalade pour l'excetion consécutive
         */
        this.climbing = undefined;
        /**
         * Liste des FrameRate executés
         */
        this.executed = [];
    }
    reset() {
        this.executed = [];
        return this;
    }
    startParallel(callback) {
        Object.values(this.reset().properties.entries)
            .sort((a, b) => b.options.duration - a.options.duration)
            .forEach((entry, key) => {
            this.executed.push(entry);
            if (key == 0)
                return entry.asyncStart().then(() => {
                    if (typeof callback == 'function')
                        callback(this);
                    if (this.properties.infinite)
                        this.start();
                });
            return entry.start();
        });
        return this;
    }
    startConsecutive(callback) {
        this.climbing = (new supports_1.Climbing(this.properties.entries, (key) => {
            var _a;
            if (this.properties.entries[key])
                this.executed.push(this.properties.entries[key]);
            return (_a = this.properties.entries[key]) === null || _a === void 0 ? void 0 : _a.asyncStart();
        })).trigger(() => {
            if (typeof callback == 'function')
                callback(this);
            if (this.properties.infinite)
                this.start();
        });
        return this;
    }
    /**
     * Démarrage des FrameRates
     */
    start(callback) {
        /**
         * Execution parallèle
         */
        if (this.properties.parallel) {
            this.startParallel(callback);
        }
        /**
         * Execution consécutive
         */
        else {
            this.startConsecutive(callback);
        }
        return this;
    }
}
exports.FramerateCollection = FramerateCollection;
//# sourceMappingURL=framerate-engine.js.map