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
var _FrameRateEasing_name, _FrameRateEasing_cubicBezier, _FrameRateEasing_formula;
import EventDispatcher from "./event-dispatcher";
export class FrameRateEasing {
    /**
     * Name of easing
     */
    get name() { return __classPrivateFieldGet(this, _FrameRateEasing_name, "f"); }
    ;
    /**
     * Courbe pour CSS
     */
    get cubicBezier() { return __classPrivateFieldGet(this, _FrameRateEasing_cubicBezier, "f"); }
    /**
     * Formule mathématique
     */
    get formula() { return __classPrivateFieldGet(this, _FrameRateEasing_formula, "f"); }
    constructor(name, cubicBezier, formula) {
        /**
         * Emetteur
         */
        this.emitter = new EventDispatcher();
        _FrameRateEasing_name.set(this, void 0);
        _FrameRateEasing_cubicBezier.set(this, void 0);
        _FrameRateEasing_formula.set(this, void 0);
        __classPrivateFieldSet(this, _FrameRateEasing_name, name, "f");
        __classPrivateFieldSet(this, _FrameRateEasing_cubicBezier, cubicBezier, "f");
        __classPrivateFieldSet(this, _FrameRateEasing_formula, formula, "f");
    }
    /**
     * Calculate from formula function
     * @param x Hit's Value
     */
    value(x) {
        const value = __classPrivateFieldGet(this, _FrameRateEasing_formula, "f").call(this, x);
        this.emitter.dispatch('make', { value, ease: this });
        return (value);
    }
    /**
     * Get cubic bezier value
     */
    property() { return this.cubicBezier; }
}
_FrameRateEasing_name = new WeakMap(), _FrameRateEasing_cubicBezier = new WeakMap(), _FrameRateEasing_formula = new WeakMap();
export default class FrameRateEasings {
    /**
     * @see https://easings.net/#easeInSine
     */
    static get InSine() {
        return (new FrameRateEasing('easeInSine', 'cubic-bezier(0.12, 0, 0.39, 0)', x => 1 - Math.cos((x * Math.PI) / 2)));
    }
    /**
     * @see https://easings.net/#easeOutSine
     */
    static get OutSine() {
        return (new FrameRateEasing('easeOutSine', 'cubic-bezier(0.37, 0, 0.63, 1)', x => Math.sin((x * Math.PI) / 2)));
    }
    /**
     * @see https://easings.net/#easeInOutSine
     */
    static get InOutSine() {
        return (new FrameRateEasing('easeInOutSine', 'cubic-bezier(0.11, 0, 0.5, 0)', x => -(Math.cos(Math.PI * x) - 1) / 2));
    }
    /**
     * @see https://easings.net/#easeInQuad
     */
    static get InQuad() {
        return (new FrameRateEasing('easeInQuad', 'cubic-bezier(0.11, 0, 0.5, 0)', x => x * x));
    }
    /**
     * @see https://easings.net/#easeOutQuad
     */
    static get OutQuad() {
        return (new FrameRateEasing('easeOutQuad', 'cubic-bezier(0.5, 1, 0.89, 1)', x => 1 - (1 - x) * (1 - x)));
    }
    /**
     * @see https://easings.net/#easeInOutQuad
     */
    static get InOutQuad() {
        return (new FrameRateEasing('easeInOutQuad', 'cubic-bezier(0.45, 0, 0.55, 1)', x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2));
    }
    /**
     * @see https://easings.net/#easeInCubic
     */
    static get InCubic() {
        return (new FrameRateEasing('easeInCubic', 'cubic-bezier(0.32, 0, 0.67, 0)', x => x * x * x));
    }
    /**
     * @see https://easings.net/#easeOutCubic
     */
    static get OutCubic() {
        return (new FrameRateEasing('easeOutCubic', 'cubic-bezier(0.33, 1, 0.68, 1)', x => 1 - Math.pow(1 - x, 3)));
    }
    /**
     * @see https://easings.net/#easeInOutCubic
     */
    static get InOutCubic() {
        return (new FrameRateEasing('easeInOutCubic', 'cubic-bezier(0.65, 0, 0.35, 1)', x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2));
    }
    /**
     * @see https://easings.net/#easeInQuart
     */
    static get InQuart() {
        return (new FrameRateEasing('easeInQuart', 'cubic-bezier(0.5, 0, 0.75, 0)', x => x * x * x * x));
    }
    /**
     * @see https://easings.net/#easeOutQuart
     */
    static get OutQuart() {
        return (new FrameRateEasing('easeOutQuart', 'cubic-bezier(0.25, 1, 0.5, 1)', x => 1 - Math.pow(1 - x, 4)));
    }
    /**
     * @see https://easings.net/#easeInOutQuart
     */
    static get InOutQuart() {
        return (new FrameRateEasing('easeInOutQuart', 'cubic-bezier(0.76, 0, 0.24, 1)', x => x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2));
    }
    /**
     * @see https://easings.net/#easeInQuint
     */
    static get InQuint() {
        return (new FrameRateEasing('easeInQuint', 'cubic-bezier(0.64, 0, 0.78, 0)', x => x * x * x * x * x));
    }
    /**
     * @see https://easings.net/#easeOutQuint
     */
    static get OutQuint() {
        return (new FrameRateEasing('easeOutQuint', 'cubic-bezier(0.22, 1, 0.36, 1)', x => 1 - Math.pow(1 - x, 5)));
    }
    /**
     * @see https://easings.net/#easeInOutQuint
     */
    static get InOutQuint() {
        return (new FrameRateEasing('easeInOutQuint', 'cubic-bezier(0.83, 0, 0.17, 1)', x => x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2));
    }
    /**
     * @see https://easings.net/#easeInExpo
     */
    static get InExpo() {
        return (new FrameRateEasing('easeInExpo', 'cubic-bezier(0.7, 0, 0.84, 0)', x => x === 0 ? 0 : Math.pow(2, 10 * x - 10)));
    }
    /**
     * @see https://easings.net/#easeOutExpo
     */
    static get OutExpo() {
        return (new FrameRateEasing('easeOutExpo', 'cubic-bezier(0.16, 1, 0.3, 1)', x => x === 1 ? 1 : 1 - Math.pow(2, -10 * x)));
    }
    /**
     * @see https://easings.net/#easeInOutExpo
     */
    static get InOutExpo() {
        return (new FrameRateEasing('easeInOutExpo', 'cubic-bezier(0.87, 0, 0.13, 1)', x => x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                    : (2 - Math.pow(2, -20 * x + 10)) / 2));
    }
    /**
     * @see https://easings.net/#easeInCirc
     */
    static get InCirc() {
        return (new FrameRateEasing('easeInCirc', 'cubic-bezier(0.55, 0, 1, 0.45)', x => 1 - Math.sqrt(1 - Math.pow(x, 2))));
    }
    /**
     * @see https://easings.net/#easeOutCirc
     */
    static get OutCirc() {
        return (new FrameRateEasing('easeOutCirc', 'cubic-bezier(0, 0.55, 0.45, 1)', x => Math.sqrt(1 - Math.pow(x - 1, 2))));
    }
    /**
     * @see https://easings.net/#easeInOutCirc
     */
    static get InOutCirc() {
        return (new FrameRateEasing('easeInOutCirc', 'cubic-bezier(0.85, 0, 0.15, 1)', x => x < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2));
    }
    /**
     * @see https://easings.net/#easeInBack
     */
    static get InBack() {
        return (new FrameRateEasing('easeInBack', 'cubic-bezier(0.36, 0, 0.66, -0.56)', x => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return c3 * x * x * x - c1 * x * x;
        }));
    }
    /**
     * @see https://easings.net/#easeOutBack
     */
    static get OutBack() {
        return (new FrameRateEasing('easeOutBack', 'cubic-bezier(0.34, 1.56, 0.64, 1)', x => {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        }));
    }
    /**
     * @see https://easings.net/#easeInOutBack
     */
    static get InOutBack() {
        return (new FrameRateEasing('easeInOutBack', 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', x => {
            const c1 = 1.70158;
            const c2 = c1 * 1.525;
            return x < 0.5
                ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        }));
    }
    /**
     * @see https://easings.net/#easeInElastic
     */
    static get InElastic() {
        return (new FrameRateEasing('easeInElastic', '', x => {
            const c4 = (2 * Math.PI) / 3;
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
        }));
    }
    /**
     * @see https://easings.net/#easeOutElastic
     */
    static get OutElastic() {
        return (new FrameRateEasing('easeOutElastic', '', x => {
            const c4 = (2 * Math.PI) / 3;
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        }));
    }
    /**
     * @see https://easings.net/#easeInOutElastic
     */
    static get InOutElastic() {
        return (new FrameRateEasing('easeInOutElastic', '', x => {
            const c5 = (2 * Math.PI) / 4.5;
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
        }));
    }
    /**
     * @see https://easings.net/#easeInBounce
     */
    static get InBounce() {
        return (new FrameRateEasing('easeInBounce', '', x => 1 - this.OutBounce.value(1 - x)));
    }
    /**
     * @see https://easings.net/#easeOutBounce
     */
    static get OutBounce() {
        return (new FrameRateEasing('easeOutBounce', '', x => {
            const n1 = 7.5625;
            const d1 = 2.75;
            if (x < 1 / d1) {
                return n1 * x * x;
            }
            else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
            }
            else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
            }
            else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
            }
        }));
    }
    /**
     * @see https://easings.net/#easeInOutBounce
     */
    static get InOutBounce() {
        return (new FrameRateEasing('easeInOutBounce', '', x => x < 0.5
            ? (1 - this.OutBounce.value(1 - 2 * x)) / 2
            : (1 + this.OutBounce.value(2 * x - 1)) / 2));
    }
}
