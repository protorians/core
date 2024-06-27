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
var _Presenter_actions, _Presenter_windowResizedListener, _ModalPresenter_instances, _ModalPresenter_opener, _ModalPresenter_closer, _Presenters_current;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presenters = exports.OverlayPresenter = exports.ModalPresenter = exports.CardPresenter = exports.Presenter = void 0;
const appearance_1 = require("./appearance");
const properties_1 = require("./properties");
const event_dispatcher_1 = require("./event-dispatcher");
const framerate_easings_1 = require("./framerate-easings");
const foundation_1 = require("../foundation");
const transitions_1 = require("./transitions");
class Presenter extends properties_1.HTMLComposite {
    constructor(overlay, props) {
        super(overlay, props);
        this.transitionTimes = 360;
        this.emitter = new event_dispatcher_1.EventDispatcher();
        _Presenter_actions.set(this, []);
        _Presenter_windowResizedListener.set(this, {});
        this.appearance = new appearance_1.CoreAppearance();
        this.initialize();
    }
    initialize() {
        return this;
    }
    open() { return this; }
    close() { return this; }
    createAnchor() {
        var _a;
        this.anchor = this.layer.cloneNode(true);
        (_a = this.layer.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(this.anchor, this.layer);
        return this;
    }
    removeAnchor() {
        var _a;
        if (this.anchor) {
            (_a = this.anchor.parentElement) === null || _a === void 0 ? void 0 : _a.replaceChild(this.layer, this.anchor);
        }
        return this;
    }
    action(action) {
        __classPrivateFieldGet(this, _Presenter_actions, "f").push(action);
        return this;
    }
    bindAction(element, name) {
        element.setAttribute('presenter:action', `${name}`);
        return this;
    }
    actionsDetector(host) {
        __classPrivateFieldGet(this, _Presenter_actions, "f").forEach(action => {
            var _a;
            return (_a = (host || this.properties.host)) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`[presenter\\:action="${action.name}"]`).forEach(layer => {
                layer.addEventListener(action.type || 'click', event => action.callback({ event, presenter: this, }));
            });
        });
        return this;
    }
    actions() { return __classPrivateFieldGet(this, _Presenter_actions, "f"); }
    size(size = 'medium') {
        switch (size) {
            case 'extra-small': return 320;
            case 'small': return 480;
            case 'large': return 960;
            case 'extra-large': return 1280;
        }
        return 768;
    }
    setCanvasSize(size = 'medium') {
        if (this.layers.canvas) {
            const pixel = this.size(size);
            this.layers.canvas.style.maxWidth = `${pixel}px`;
        }
        return this;
    }
    setCanvasCentred(axe = 'horizontal') {
        if (this.layers.canvas && this.properties.host) {
            const host = this.properties.host.getBoundingClientRect();
            const shape = this.layers.canvas.getBoundingClientRect();
            if (axe == 'horizontal' || axe == 'double') {
                host.width = host.width || 1;
                shape.width = shape.width || 1;
                this.layers.canvas.style.left = `${(host.width - shape.width) / 2}px`;
            }
            if (axe == 'vertical' || axe == 'double') {
                host.height = host.height || 1;
                shape.height = shape.height || 1;
                this.layers.canvas.style.top = `${(host.height - shape.height) / 2}px`;
            }
        }
        if (!__classPrivateFieldGet(this, _Presenter_windowResizedListener, "f")[axe]) {
            window.addEventListener('resize', () => {
                this.setCanvasCentred(axe);
            });
            __classPrivateFieldGet(this, _Presenter_windowResizedListener, "f")[axe] = true;
        }
        return this;
    }
}
exports.Presenter = Presenter;
_Presenter_actions = new WeakMap(), _Presenter_windowResizedListener = new WeakMap();
/**
 * CardPresenter
 * @description Presentation en carte
 * @example
 * const card = new CardPresenter({
 *    host: document.querySelector<HTMLElement>('.sheet'),
 *    color: '#cacaca',
 *    opacity: 75,
 *    locked: false,
 *    transition: CoreTransitions.SlideFadedVertical,
 * })
 */
class CardPresenter extends Presenter {
    constructor() {
        super(...arguments);
        this.emitter = new event_dispatcher_1.EventDispatcher();
    }
    initialize() {
        this.appearance.sheet({
            '&.presenter\\:card': {
                boxShadow: '0 0 2rem rgba(0,0,0,.3)',
                borderRadius: '1rem',
                position: 'relative',
                transition: `all ${this.transitionTimes || 360}ms ease-in-out`,
                transform: 'scale(.96) ',
            },
            '.presenter\\:child': {
                position: 'absolute',
                bottom: '0',
                left: '-1.5rem',
                width: 'calc(100vw + 2vw )',
                height: 'calc(100vh - 1rem)',
                zIndex: '999',
            },
        }).mount();
        this.properties.host = this.properties.host || document.body;
        return this;
    }
    open() {
        var _a, _b, _c;
        if (this.layer) {
            (_a = this.properties.host) === null || _a === void 0 ? void 0 : _a.classList.add(`${this.appearance.uid}`);
            (_b = this.properties.host) === null || _b === void 0 ? void 0 : _b.classList.add('presenter:card');
            (_c = this.properties.host) === null || _c === void 0 ? void 0 : _c.appendChild(this.layer);
            (new foundation_1.FramerateCollection({
                entries: [
                    (new foundation_1.Framerate({
                        from: screen.height * 10,
                        to: 0,
                        duration: this.transitionTimes || 360,
                        ease: framerate_easings_1.FrameRateEasings.InSine,
                        frame: ({ value }) => {
                            if (this.layer)
                                this.layer.style.top = `${value / 1000}rem`;
                        }
                    })),
                ],
                parallel: true,
            })).start();
        }
        return this;
    }
    close() {
        if (this.layer) {
            (new foundation_1.FramerateCollection({
                entries: [
                    (new foundation_1.Framerate({
                        from: 0,
                        to: screen.height * 10,
                        duration: this.transitionTimes || 360,
                        ease: framerate_easings_1.FrameRateEasings.InSine,
                        frame: ({ value }) => {
                            if (this.layer)
                                this.layer.style.top = `${value / 1000}rem`;
                        }
                    })),
                ],
                parallel: true,
            })).start(() => {
                var _a;
                const host = this.properties.host || document.body;
                host.classList.remove(`${this.appearance.uid}`);
                host.classList.remove('component:presenter-card');
                (_a = this.layer) === null || _a === void 0 ? void 0 : _a.classList.remove('presenter:child');
            });
        }
        return this;
    }
}
exports.CardPresenter = CardPresenter;
/**
 * ModalPresenter
 * @description Presentation en modal
 * @example
 * const modal = new CardPresenter({
 *    host: document.querySelector<HTMLElement>('.sheet'),
 * })
 */
class ModalPresenter extends Presenter {
    constructor() {
        super(...arguments);
        _ModalPresenter_instances.add(this);
        this.emitter = new event_dispatcher_1.EventDispatcher();
    }
    initialize() {
        this.properties.host = this.properties.host || document.body;
        this
            .createLayer('shadow', 'div')
            .createLayer('canvas', 'div')
            .createLayer('face', 'div')
            .createLayer('back', 'div');
        this.bindAction(this.layers.back, 'close');
        this.appearance.sheet({
            '&.presenter\\:modal': {
                position: 'relative',
            },
            '.modal\\:canvas.modal\\:ready': {
                display: 'flex',
            },
            '.modal\\:opened .modal\\:back': {
                backgroundColor: this.properties.color || 'black',
                opacity: `${(this.properties.opacity || 25) / 100}`,
            },
            '.modal\\:canvas': {
                position: 'absolute',
                overflow: 'hidden',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                zIndex: '999',
                maxWidth: '100vw',
                maxHeight: '100vh',
                width: '100%',
                height: '100%',
                display: 'none',
                backdropFilter: !this.properties.blurred ? 'none' : 'blur(.5rem)',
                alignItems: 'center',
                justifyContent: 'center',
                // transition: 'all 360ms ease-in-out'
            },
            '.modal\\:back': {
                position: 'absolute',
                overflow: 'hidden',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '100%',
                zIndex: '1',
                backgroundColor: 'rgba(0,0,0,.0)',
                transition: 'all 360ms ease-in-out'
            },
            '.modal\\:face': {
                zIndex: '2',
            },
        }).mount();
        this.action({
            name: 'close',
            callback: () => (!this.properties.locked) ? this.close() : undefined
        });
        return this;
    }
    open() {
        var _a, _b, _c;
        console.log('Modal Host', this.properties.host);
        if (this.layer) {
            this.createAnchor();
            (_a = this.properties.host) === null || _a === void 0 ? void 0 : _a.classList.add(`${this.appearance.uid}`);
            (_b = this.properties.host) === null || _b === void 0 ? void 0 : _b.classList.add('presenter:modal');
            this.layers.canvas.classList.add('modal:canvas');
            this.layers.canvas.classList.add('modal:ready');
            this.layers.back.classList.add('modal:back');
            this.layers.face.classList.add('modal:face');
            this.layers.canvas.appendChild(this.layers.back);
            this.layers.canvas.appendChild(this.layers.face);
            (_c = this.properties.host) === null || _c === void 0 ? void 0 : _c.appendChild(this.layers.canvas);
            this.layers.face.appendChild(this.layer);
            this.properties.transition = this.properties.transition
                || transitions_1.CoreTransitions.Fade;
            __classPrivateFieldGet(this, _ModalPresenter_instances, "m", _ModalPresenter_opener).call(this, () => {
                this.layers.canvas.classList.add('modal:opened');
                this.emitter.dispatch('open', this);
                this.actionsDetector(this.layers.canvas);
            });
        }
        return this;
    }
    close() {
        this.properties.transition = this.properties.transition || transitions_1.CoreTransitions.Fade;
        __classPrivateFieldGet(this, _ModalPresenter_instances, "m", _ModalPresenter_closer).call(this, () => {
            this.removeAnchor();
            this.layers.canvas.classList.remove('modal:opened');
            this.layers.shadow.appendChild(this.layers.canvas);
            this.emitter.dispatch('close', this);
        });
        return this;
    }
}
exports.ModalPresenter = ModalPresenter;
_ModalPresenter_instances = new WeakSet(), _ModalPresenter_opener = function _ModalPresenter_opener(callback) {
    if (this.properties.transition && this.layers.canvas) {
        this.properties.transition.startIn(this.layers.canvas, callback);
    }
    return this;
}, _ModalPresenter_closer = function _ModalPresenter_closer(callback) {
    this.layers.canvas.classList.remove('modal:opened');
    if (this.properties.transition && this.layers.canvas) {
        this.properties.transition.startOut(this.layers.canvas, callback);
    }
    return this;
};
/**
 * OverlayPresenter
 * @description Presentation en surcouche
 */
class OverlayPresenter extends Presenter {
    constructor() {
        super(...arguments);
        this.emitter = new event_dispatcher_1.EventDispatcher();
    }
    initialize() {
        this.createLayer('canvas', 'div');
        this.appearance.sheet({
            '&.presenter\\:overlay': {
                position: 'relative',
            },
            '.overlay\\:canvas': {
                position: 'fixed',
                zIndex: '999',
                width: '100%',
                height: '100%',
            },
            // '&.presenter\\:overlay': {
            //   boxShadow: '0 0 2rem rgba(0,0,0,.3)',
            //   borderRadius: '1rem',
            //   position: 'relative',
            //   transition: `all ${this.transitionTimes || 360}ms ease-in-out`,
            // },
        }).mount();
        return this;
    }
    setPosition() {
        switch (this.properties.direction) {
            case 'top':
                this.layers.canvas.style.top = `0`;
                this.setCanvasCentred('horizontal');
                break;
            case 'right':
                this.layers.canvas.style.top = `0`;
                this.layers.canvas.style.right = `0`;
                break;
            case 'left':
                this.layers.canvas.style.top = `0`;
                this.layers.canvas.style.left = `0`;
                break;
            case 'center':
                this.setCanvasCentred('double');
                break;
            default:
                this.layers.canvas.style.bottom = `0`;
                this.setCanvasCentred('horizontal');
                break;
        }
        return this;
    }
    open() {
        var _a, _b, _c;
        if (this.layer) {
            this.createAnchor();
            (_a = this.properties.host) === null || _a === void 0 ? void 0 : _a.classList.add(`${this.appearance.uid}`);
            (_b = this.properties.host) === null || _b === void 0 ? void 0 : _b.classList.add(`presenter:overlay`);
            this.layers.canvas.classList.add('overlay:canvas');
            (_c = this.properties.host) === null || _c === void 0 ? void 0 : _c.appendChild(this.layers.canvas);
            this.layers.canvas.appendChild(this.layer);
            this.setPosition();
            this.setCanvasSize(this.properties.size);
            this.emitter.dispatch('open', this);
        }
        return this;
    }
    close() {
        this.removeAnchor();
        this.emitter.dispatch('close', this);
        return this;
    }
}
exports.OverlayPresenter = OverlayPresenter;
/**
 * Presenters
 * @description Controlleur de présentation dans un context
 * @example
 * const presenter = Presenters.context( ... )
 */
class Presenters {
    get presenter() {
        return __classPrivateFieldGet(this, _Presenters_current, "f");
    }
    constructor(presenter) {
        _Presenters_current.set(this, void 0);
        this.emitter = new event_dispatcher_1.EventDispatcher();
        this.status = false;
        __classPrivateFieldSet(this, _Presenters_current, presenter, "f");
        this.initialize();
    }
    initialize() {
        __classPrivateFieldGet(this, _Presenters_current, "f").emitter.listen('open', () => {
            document.body.style.overflow = 'hidden';
            document.body.scrollTo({ top: 0 });
        });
        __classPrivateFieldGet(this, _Presenters_current, "f").emitter.listen('close', () => {
            document.body.style.removeProperty('overflow');
        });
        return this;
    }
    open() {
        var _a;
        (_a = __classPrivateFieldGet(this, _Presenters_current, "f").layer) === null || _a === void 0 ? void 0 : _a.classList.add('presenter:child');
        __classPrivateFieldGet(this, _Presenters_current, "f").open();
        this.emitter.dispatch('open', this);
        this.status = true;
        return this;
    }
    close() {
        var _a;
        (_a = __classPrivateFieldGet(this, _Presenters_current, "f").layer) === null || _a === void 0 ? void 0 : _a.classList.remove('presenter:child');
        __classPrivateFieldGet(this, _Presenters_current, "f").close();
        this.emitter.dispatch('close', this);
        this.status = false;
        return this;
    }
    render() {
        return this;
    }
    static context(presenter) {
        return (new this(presenter)).render();
    }
}
exports.Presenters = Presenters;
_Presenters_current = new WeakMap();
//# sourceMappingURL=presenters.js.map