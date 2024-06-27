"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _CoreTransitions_duration;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreTransitions = exports.CoreTransition = void 0;
const properties_1 = require("./properties");
const animation_1 = require("./animation");
class CoreTransition extends properties_1.PropertiesBag {
    constructor(props) {
        super(props);
        this.currentMoment = undefined;
    }
    calibrate(moment, property, value) {
        this.properties[moment].calibrates(property, value);
        return this;
    }
    calibrateIn(property, value) {
        this.calibrate('in', property, value);
        return this;
    }
    calibrateOut(property, value) {
        this.calibrate('in', property, value);
        return this;
    }
    startIn(target, callback) {
        this.currentMoment = true;
        this.properties.in.start(target, callback);
        return this;
    }
    startOut(target, callback) {
        this.currentMoment = false;
        this.properties.out.start(target, callback);
        return this;
    }
    toggle(target, callback) {
        if (this.currentMoment)
            this.startOut(target, callback);
        else
            this.startIn(target, callback);
        return this;
    }
}
exports.CoreTransition = CoreTransition;
class CoreTransitions {
    static get duration() { return __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration) || 500; }
    static set duration(value) { if (typeof value == 'number')
        __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration); }
    /**
     * Fade Transition
     */
    static get Fade() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                opacity: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                }
            }),
            out: new animation_1.CoreAnimation({
                opacity: {
                    from: 1000,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                }
            }),
        });
    }
    /**
     * Cards
     */
    static get Card() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 1000,
                    to: 900,
                    duration: _a.duration,
                    set: ({ value }) => `scale(${Math.abs(value / 1000)})`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 900,
                    to: 1000,
                    duration: _a.duration,
                    set: ({ value }) => `scale(${Math.abs(value / 1000)})`
                },
            }, {
                parallel: true,
            }),
        });
    }
    /**
     * Zoom Transition
     */
    static get Zoom() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `scale(${value / 1000})`
                }
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 1000,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `scale(${value / 1000})`
                }
            }),
        });
    }
    /**
     * Zoom Faded Transition
     */
    static get ZoomFaded() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `scale(${value / 1000})`
                },
                opacity: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                },
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 1000,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `scale(${value / 1000})`
                },
                opacity: {
                    from: 1000,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                },
            }),
        });
    }
    /**
     * SlideHorizontal  Transition avec fondu
     */
    static get SlideFadedHorizontal() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(${value}%)`
                },
                opacity: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(${value}%)`
                },
                opacity: {
                    from: 1000,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                }
            }, {
                parallel: true,
            }),
        });
    }
    /**
     * SlideHorizontal  Transition
     */
    static get SlideHorizontal() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(${value}%)`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(${value}%)`
                },
            }, {
                parallel: true,
            }),
        });
    }
    /**
     * SlideVertical  Transition avec fondu
     */
    static get SlideFadedVertical() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(${value}%)`
                },
                opacity: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(${value}%)`
                },
                opacity: {
                    from: 1000,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                }
            }, {
                parallel: true,
            }),
        });
    }
    /**
     * SlideVertical  Transition
     */
    static get SlideVertical() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(${value}%)`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(${value}%)`
                },
            }, {
                parallel: true,
            }),
        });
    }
    /**
     * SlideHorizontalReverse  Transition avec fondu
     */
    static get SlideFadedHorizontalReverse() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(-${value}%)`
                },
                opacity: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(-${value}%)`
                },
                opacity: {
                    from: 1000,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                }
            }, {
                parallel: true,
            }),
        });
    }
    /**
     * SlideHorizontal  Transition
     */
    static get SlideHorizontalReverse() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(-${value}%)`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(-${value}%)`
                },
            }, {
                parallel: true,
            }),
        });
    }
    /**
     * SlideVertical  Transition avec fondu
     */
    static get SlideFadedVerticalReverse() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(-${value}%)`
                },
                opacity: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(-${value}%)`
                },
                opacity: {
                    from: 1000,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                }
            }, {
                parallel: true,
            }),
        });
    }
    /**
     * SlideVerticalReverse  Transition
     */
    static get SlideVerticalReverse() {
        return new CoreTransition({
            in: new animation_1.CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(-${value}%)`
                },
            }, {
                parallel: true,
            }),
            out: new animation_1.CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(-${value}%)`
                },
            }, {
                parallel: true,
            }),
        });
    }
}
exports.CoreTransitions = CoreTransitions;
_a = CoreTransitions;
_CoreTransitions_duration = { value: 500 };
//# sourceMappingURL=transitions.js.map