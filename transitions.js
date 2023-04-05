var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _CoreTransitions_duration;
import { CompositeModel } from './composite';
import { CoreAnimation } from './animation';
export class CoreTransition extends CompositeModel {
    constructor(props) {
        super(props);
        this.currentMoment = undefined;
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
export class CoreTransitions {
    static get duration() { return __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration) || 500; }
    static set duration(value) { if (typeof value == 'number')
        __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration); }
    /**
     * Fade Transition
     */
    static get Fade() {
        return new CoreTransition({
            in: new CoreAnimation({
                opacity: {
                    from: 0,
                    to: 1000,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `${value / 1000}`
                }
            }),
            out: new CoreAnimation({
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
     * SlideHorizontal  Transition avec fondu
     */
    static get SlideFadedHorizontal() {
        return new CoreTransition({
            in: new CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
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
            out: new CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
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
            in: new CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(${value}%)`
                },
            }, {
                parallel: true,
            }),
            out: new CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
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
            in: new CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
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
            out: new CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
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
            in: new CoreAnimation({
                transform: {
                    from: 0,
                    to: 100,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(${value}%)`
                },
            }, {
                parallel: true,
            }),
            out: new CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
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
            in: new CoreAnimation({
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
            out: new CoreAnimation({
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
            in: new CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateX(-${value}%)`
                },
            }, {
                parallel: true,
            }),
            out: new CoreAnimation({
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
            in: new CoreAnimation({
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
            out: new CoreAnimation({
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
            in: new CoreAnimation({
                transform: {
                    from: 100,
                    to: 0,
                    duration: __classPrivateFieldGet(this, _a, "f", _CoreTransitions_duration),
                    set: ({ value }) => `translateY(-${value}%)`
                },
            }, {
                parallel: true,
            }),
            out: new CoreAnimation({
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
_a = CoreTransitions;
_CoreTransitions_duration = { value: 500 };
