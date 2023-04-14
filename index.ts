import * as CoumpoundClimbing from './climbing';
import * as CoumpoundComposite from './composite';
import * as CompoundMetricRandom from './metric';
import * as CompoundNavigation from './navigation';
import * as FrameRatesEngine from './framerate-engine';
import * as FrameRateEasing from './framerate-easings';
import * as EventDispatchers from './event-dispatcher'
import * as ElementAnimate from './animation';
import * as CoreAttribute from './attribute';
import * as CoreAppearance from './appearance';
import * as Utilities from './utilities';




export default {

  FrameRates: {

    Engine: FrameRatesEngine,

    Easing: FrameRateEasing,

  },

  Utilities,

  Compound: {

    Climbing: CoumpoundClimbing,

    Composite: CoumpoundComposite,

    MetricRandom: CompoundMetricRandom,

    Navigation: CompoundNavigation,

  },

  Element: {

    Animate: ElementAnimate,

    Attribute: CoreAttribute,

    Appearance: CoreAppearance,

  },

  Events: {

    Dispatcher: EventDispatchers

  },

}