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
var _FrameRate_instances, _FrameRate_options, _FrameRate_current, _FrameRate_status, _FrameRate_paused, _FrameRate_stopped, _FrameRate_handler, _FrameRate_initialize, _FrameRate_prepare, _FrameRate_elapsed, _FrameRate_calculate, _FrameRate_frame, _FrameRate_playing, _FrameRates_executed;
import { ModelComposite } from "./composite";
import Climbing from "./climbing";
import EventDispatcher from "./event-dispatcher";
export class FrameRate {
    get handler() { return __classPrivateFieldGet(this, _FrameRate_handler, "f"); }
    get options() { return __classPrivateFieldGet(this, _FrameRate_options, "f"); }
    get rawdelta() { return (__classPrivateFieldGet(this, _FrameRate_options, "f").to - __classPrivateFieldGet(this, _FrameRate_options, "f").from); }
    get delta() { return Math.abs(__classPrivateFieldGet(this, _FrameRate_options, "f").to - __classPrivateFieldGet(this, _FrameRate_options, "f").from); }
    get sens() { return (__classPrivateFieldGet(this, _FrameRate_options, "f").to - __classPrivateFieldGet(this, _FrameRate_options, "f").from) > 0 ? true : false; }
    get paused() { return __classPrivateFieldGet(this, _FrameRate_paused, "f"); }
    get stopped() { return __classPrivateFieldGet(this, _FrameRate_stopped, "f"); }
    constructor(options) {
        _FrameRate_instances.add(this);
        this.emitter = new EventDispatcher();
        _FrameRate_options.set(this, void 0);
        _FrameRate_current.set(this, {});
        _FrameRate_status.set(this, false);
        _FrameRate_paused.set(this, false);
        _FrameRate_stopped.set(this, false);
        _FrameRate_handler.set(this, undefined);
        __classPrivateFieldSet(this, _FrameRate_options, options, "f");
    }
    get payload() {
        return __classPrivateFieldGet(this, _FrameRate_current, "f");
    }
    syncronizeValue(x) {
        return (__classPrivateFieldGet(this, _FrameRate_options, "f").from > __classPrivateFieldGet(this, _FrameRate_options, "f").to
            ? __classPrivateFieldGet(this, _FrameRate_options, "f").from - x
            : x - __classPrivateFieldGet(this, _FrameRate_options, "f").from);
        // return this.sens ? x : this.delta - x;
    }
    reset() {
        __classPrivateFieldGet(this, _FrameRate_current, "f").started = undefined;
        __classPrivateFieldGet(this, _FrameRate_current, "f").elapsed = undefined;
        __classPrivateFieldGet(this, _FrameRate_current, "f").previous = undefined;
        __classPrivateFieldSet(this, _FrameRate_status, false, "f");
        __classPrivateFieldSet(this, _FrameRate_stopped, false, "f");
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
        if (__classPrivateFieldGet(this, _FrameRate_handler, "f"))
            cancelAnimationFrame(__classPrivateFieldGet(this, _FrameRate_handler, "f"));
        __classPrivateFieldSet(this, _FrameRate_stopped, true, "f");
        return this;
    }
    start() {
        var _a;
        return __classPrivateFieldGet((_a = __classPrivateFieldGet(this, _FrameRate_instances, "m", _FrameRate_initialize).call(this)), _FrameRate_instances, "m", _FrameRate_playing).call(_a);
    }
    asyncStart() {
        return new Promise((done) => {
            this.emitter.listen('done', engine => done(engine));
            this.start();
        });
    }
}
_FrameRate_options = new WeakMap(), _FrameRate_current = new WeakMap(), _FrameRate_status = new WeakMap(), _FrameRate_paused = new WeakMap(), _FrameRate_stopped = new WeakMap(), _FrameRate_handler = new WeakMap(), _FrameRate_instances = new WeakSet(), _FrameRate_initialize = function _FrameRate_initialize() {
    return this.reset();
}, _FrameRate_prepare = function _FrameRate_prepare(time) {
    if (__classPrivateFieldGet(this, _FrameRate_current, "f").started === undefined) {
        __classPrivateFieldGet(this, _FrameRate_current, "f").started = time;
        this.emitter.dispatch('prepare', this);
    }
    return this;
}, _FrameRate_elapsed = function _FrameRate_elapsed(time) {
    if (typeof __classPrivateFieldGet(this, _FrameRate_current, "f").started == 'number') {
        __classPrivateFieldGet(this, _FrameRate_current, "f").elapsed = time - __classPrivateFieldGet(this, _FrameRate_current, "f").started;
        this.emitter.dispatch('updateElapsed', this);
    }
    return this;
}, _FrameRate_calculate = function _FrameRate_calculate(time) {
    if (typeof __classPrivateFieldGet(this, _FrameRate_current, "f").elapsed == 'number') {
        if (__classPrivateFieldGet(this, _FrameRate_current, "f").previous !== time) {
            const time = Math.min(__classPrivateFieldGet(this, _FrameRate_current, "f").elapsed, this.options.duration);
            const quotient = (time / this.options.duration);
            const complete = time >= this.options.duration;
            if (__classPrivateFieldGet(this, _FrameRate_options, "f").ease) {
                const percent = __classPrivateFieldGet(this, _FrameRate_options, "f").ease.value(quotient) * 100;
                const value = (percent * this.delta) / 100;
                __classPrivateFieldGet(this, _FrameRate_options, "f").frame({
                    percent,
                    value: this.syncronizeValue(value)
                });
            }
            if (!__classPrivateFieldGet(this, _FrameRate_options, "f").ease) {
                const percent = quotient * 100;
                const value = (((percent) * (this.delta)) / 100);
                // const master = 
                __classPrivateFieldGet(this, _FrameRate_options, "f").frame({
                    percent,
                    value: this.syncronizeValue(value)
                });
            }
            if (complete) {
                __classPrivateFieldSet(this, _FrameRate_status, true, "f");
                // this.#options.frame({ percent: 100, value: this.options.to })
                this.emitter.dispatch('done', this);
                return this;
            }
        }
        this.emitter.dispatch('checkEnding', this);
    }
    return this;
}, _FrameRate_frame = function _FrameRate_frame(time) {
    if (typeof __classPrivateFieldGet(this, _FrameRate_current, "f").elapsed == 'number') {
        if (__classPrivateFieldGet(this, _FrameRate_current, "f").elapsed < this.options.duration) {
            __classPrivateFieldGet(this, _FrameRate_current, "f").previous = time;
            if (__classPrivateFieldGet(this, _FrameRate_status, "f") === false) {
                this.emitter.dispatch('frame', this);
                __classPrivateFieldSet(this, _FrameRate_handler, requestAnimationFrame(__classPrivateFieldGet(this, _FrameRate_instances, "m", _FrameRate_playing).bind(this)), "f");
            }
        }
    }
    return this;
}, _FrameRate_playing = function _FrameRate_playing() {
    // if( this.paused ){
    //   console.warn('Pause, standby', this.#paused )
    // }
    // else if( this.#stopped ){
    //   console.error('Stop, reset now', this.#stopped )
    //   this.reset();
    // }
    // else{
    __classPrivateFieldSet(this, _FrameRate_handler, requestAnimationFrame((time) => {
        // if( this.paused || this.#stopped ){
        var _a, _b, _c;
        //   console.log('standby', this.#current )
        // }
        // else{
        __classPrivateFieldGet((_a = __classPrivateFieldGet((_b = __classPrivateFieldGet((_c = __classPrivateFieldGet(this, _FrameRate_instances, "m", _FrameRate_prepare).call(this, time)), _FrameRate_instances, "m", _FrameRate_elapsed).call(_c, time)), _FrameRate_instances, "m", _FrameRate_calculate).call(_b, time)), _FrameRate_instances, "m", _FrameRate_frame).call(_a, time);
        // }
    }), "f");
    // }
    return this;
};
export default class FrameRates extends ModelComposite {
    constructor(props) {
        super(props);
        /**
         * Jeu d'escalade pour l'excetion consécutive
         */
        this.climbing = undefined;
        /**
         * Liste des FrameRate executés
         */
        _FrameRates_executed.set(this, []);
    }
    reset() {
        __classPrivateFieldSet(this, _FrameRates_executed, [], "f");
        return this;
    }
    startParallel(callback) {
        Object.values(this.reset().properties.entries)
            .sort((a, b) => b.options.duration - a.options.duration)
            .forEach((entry, key) => {
            __classPrivateFieldGet(this, _FrameRates_executed, "f").push(entry);
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
        this.climbing = (new Climbing(this.properties.entries, (key) => {
            if (this.properties.entries[key])
                __classPrivateFieldGet(this, _FrameRates_executed, "f").push(this.properties.entries[key]);
            return this.properties.entries[key]?.asyncStart();
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
_FrameRates_executed = new WeakMap();
// (new FrameRate({
//   start: 0,
//   stop: 200,
//   duration: 1000,
// })).start()
