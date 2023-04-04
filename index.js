import * as CoumpoundClimbing from './compound.climbing';
import * as CoumpoundComposite from './compound.composite';
import * as ElementAnimate from './element.animate';
import * as FrameRatesEngine from './framerate.engine';
import * as EventDispatchers from './event.dispatcher';
import * as FrameRateEasing from './framerate.easings';
export default {
    FrameRates: {
        Engine: FrameRatesEngine,
        Easing: FrameRateEasing,
    },
    Compound: {
        Climbing: CoumpoundClimbing,
        Composite: CoumpoundComposite,
    },
    Element: {
        Animate: ElementAnimate
    },
    Events: {
        Dispatcher: EventDispatchers
    },
};
