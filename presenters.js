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
import CoreAppearance from "./appearance";
import { HTMLComposite } from "./composite";
import EventDispatcher from "./event-dispatcher";
import FrameRateEasings from "./framerate-easings";
import FrameRates, { FrameRate } from "./framerate-engine";
import { CoreTransitions } from "./transitions";
export class Presenter extends HTMLComposite {
    constructor(overlay, props) {
        super(overlay, props);
        this.transitionTimes = 360;
        this.emitter = new EventDispatcher();
        _Presenter_actions.set(this, []);
        _Presenter_windowResizedListener.set(this, {});
        this.appearance = new CoreAppearance();
        this.initialize();
    }
    initialize() {
        return this;
    }
    open() { return this; }
    close() { return this; }
    createAnchor() {
        this.anchor = this.layer.cloneNode(true);
        this.layer.parentElement?.replaceChild(this.anchor, this.layer);
        return this;
    }
    removeAnchor() {
        if (this.anchor) {
            this.anchor.parentElement?.replaceChild(this.layer, this.anchor);
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
        __classPrivateFieldGet(this, _Presenter_actions, "f").forEach(action => (host || this.properties.host)
            ?.querySelectorAll(`[presenter\\:action="${action.name}"]`)
            .forEach(layer => {
            layer.addEventListener(action.type || 'click', event => action.callback({ event, presenter: this, }));
        }));
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
export class CardPresenter extends Presenter {
    constructor() {
        super(...arguments);
        this.emitter = new EventDispatcher();
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
                zIndex: '99',
            },
        }).mount();
        this.properties.host = this.properties.host || document.body;
        return this;
    }
    open() {
        if (this.layer) {
            this.properties.host?.classList.add(`${this.appearance.uid}`);
            this.properties.host?.classList.add('presenter:card');
            (new FrameRates({
                entries: [
                    (new FrameRate({
                        from: screen.height * 10,
                        to: 0,
                        duration: this.transitionTimes || 360,
                        ease: FrameRateEasings.InSine,
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
            (new FrameRates({
                entries: [
                    (new FrameRate({
                        from: 0,
                        to: screen.height * 10,
                        duration: this.transitionTimes || 360,
                        ease: FrameRateEasings.InSine,
                        frame: ({ value }) => {
                            if (this.layer)
                                this.layer.style.top = `${value / 1000}rem`;
                        }
                    })),
                ],
                parallel: true,
            })).start(() => {
                const host = this.properties.host || document.body;
                host.classList.remove(`${this.appearance.uid}`);
                host.classList.remove('component:presenter-card');
                this.layer?.classList.remove('presenter:child');
            });
        }
        return this;
    }
}
/**
 * ModalPresenter
 * @description Presentation en modal
 * @example
 * const modal = new CardPresenter({
 *    host: document.querySelector<HTMLElement>('.sheet'),
 * })
 */
export class ModalPresenter extends Presenter {
    constructor() {
        super(...arguments);
        _ModalPresenter_instances.add(this);
        this.emitter = new EventDispatcher();
    }
    initialize() {
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
                display: 'none',
                backdropFilter: !this.properties.blurred ? '' : 'blur(.5rem)',
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
        if (this.layer) {
            this.createAnchor();
            this.properties.host?.classList.add(`${this.appearance.uid}`);
            this.properties.host?.classList.add('presenter:modal');
            this.layers.canvas.classList.add('modal:canvas');
            this.layers.canvas.classList.add('modal:ready');
            this.layers.back.classList.add('modal:back');
            this.layers.face.classList.add('modal:face');
            this.layers.canvas.appendChild(this.layers.back);
            this.layers.canvas.appendChild(this.layers.face);
            this.properties.host?.appendChild(this.layers.canvas);
            this.layers.face.appendChild(this.layer);
            this.properties.transition = this.properties.transition
                || CoreTransitions.Fade;
            __classPrivateFieldGet(this, _ModalPresenter_instances, "m", _ModalPresenter_opener).call(this, () => {
                this.layers.canvas.classList.add('modal:opened');
                this.emitter.dispatch('open', this);
                this.actionsDetector(this.layers.canvas);
            });
        }
        return this;
    }
    close() {
        this.properties.transition = this.properties.transition || CoreTransitions.Fade;
        __classPrivateFieldGet(this, _ModalPresenter_instances, "m", _ModalPresenter_closer).call(this, () => {
            this.removeAnchor();
            this.layers.canvas.classList.remove('modal:opened');
            this.layers.shadow.appendChild(this.layers.canvas);
            this.emitter.dispatch('close', this);
        });
        return this;
    }
}
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
export class OverlayPresenter extends Presenter {
    constructor() {
        super(...arguments);
        this.emitter = new EventDispatcher();
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
        if (this.layer) {
            this.createAnchor();
            this.properties.host?.classList.add(`${this.appearance.uid}`);
            this.properties.host?.classList.add(`presenter:overlay`);
            this.layers.canvas.classList.add('overlay:canvas');
            this.properties.host?.appendChild(this.layers.canvas);
            this.layers.canvas.appendChild(this.layer);
            this.setPosition();
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
/**
 * Presenters
 * @description Controlleur de présentation dans un context
 * @example
 * const presenter = Presenters.context( ... )
 */
export default class Presenters {
    get presenter() {
        return __classPrivateFieldGet(this, _Presenters_current, "f");
    }
    constructor(presenter) {
        _Presenters_current.set(this, void 0);
        this.emitter = new EventDispatcher();
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
        __classPrivateFieldGet(this, _Presenters_current, "f").setCanvasSize(__classPrivateFieldGet(this, _Presenters_current, "f").properties.size);
        __classPrivateFieldGet(this, _Presenters_current, "f").layer?.classList.add('presenter:child');
        __classPrivateFieldGet(this, _Presenters_current, "f").open();
        this.emitter.dispatch('open', this);
        this.status = true;
        return this;
    }
    close() {
        __classPrivateFieldGet(this, _Presenters_current, "f").layer?.classList.remove('presenter:child');
        __classPrivateFieldGet(this, _Presenters_current, "f").close();
        this.emitter.dispatch('close', this);
        this.status = false;
        return this;
    }
    render() {
        return this.open();
    }
    static context(presenter) {
        return (new this(presenter)).render();
    }
}
_Presenters_current = new WeakMap();
