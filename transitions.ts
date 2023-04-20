import type {
  IElementTarget,
  ICoreTransition,
  IAnimationStateCallback,
  ICoreTransitionProps,
  IAnimationCalibrate,
} from './types';
import { ModelComposite } from './composite'
import { CoreAnimation } from './animation';




export class CoreTransition extends ModelComposite<ICoreTransitionProps> implements ICoreTransition {

  currentMoment?: boolean = undefined;

  constructor(props: ICoreTransitionProps) {

    super(props);

  }

  calibrate(

    moment: 'in' | 'out',

    property: keyof IAnimationCalibrate,

    value: IAnimationCalibrate[keyof IAnimationCalibrate]

  ) {

    this.properties[moment].calibrates(property, value)

    return this;

  }

  calibrateIn(

    property: keyof IAnimationCalibrate,

    value: IAnimationCalibrate[keyof IAnimationCalibrate]

  ) {

    this.calibrate('in', property, value)

    return this;

  }

  calibrateOut(

    property: keyof IAnimationCalibrate,

    value: IAnimationCalibrate[keyof IAnimationCalibrate]

  ) {

    this.calibrate('in', property, value)

    return this;

  }

  startIn(target: IElementTarget, callback?: IAnimationStateCallback): this {

    this.currentMoment = true;

    this.properties.in.start(target, callback);

    return this;

  }

  startOut(target: IElementTarget, callback?: IAnimationStateCallback): this {

    this.currentMoment = false;

    this.properties.out.start(target, callback)

    return this;

  }

  toggle(target: IElementTarget, callback?: IAnimationStateCallback): this {

    if (this.currentMoment) this.startOut(target, callback)

    else this.startIn(target, callback)

    return this;

  }

}




export class CoreTransitions {


  static get duration(): number { return this.#duration || 500; }

  static set duration(value) { if (typeof value == 'number') this.#duration; }

  static #duration: number = 500;


  /**
   * Fade Transition
   */
  static get Fade(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        opacity: {
          from: 0,
          to: 1000,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        }

      }),

      out: new CoreAnimation({
        opacity: {
          from: 1000,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        }

      }),

    })

  }


  /**
   * Zoom Transition
   */
  static get Zoom(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 0,
          to: 1000,
          duration: this.#duration,
          set: ({ value }) => `scale(${value / 1000})`
        }

      }),

      out: new CoreAnimation({
        transform: {
          from: 1000,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `scale(${value / 1000})`
        }

      }),

    })

  }


  /**
   * Zoom Faded Transition
   */
  static get ZoomFaded(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 0,
          to: 1000,
          duration: this.#duration,
          set: ({ value }) => `scale(${value / 1000})`
        },

        opacity: {
          from: 0,
          to: 1000,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        },
      }),

      out: new CoreAnimation({
        transform: {
          from: 1000,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `scale(${value / 1000})`
        },

        opacity: {
          from: 1000,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        },
      }),

    })

  }






  /**
   * SlideHorizontal  Transition avec fondu
   */
  static get SlideFadedHorizontal(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 100,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `translateX(${value}%)`
        },

        opacity: {
          from: 0,
          to: 1000,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        },

      }, {
        parallel: true,
      }),

      out: new CoreAnimation({
        transform: {
          from: 0,
          to: 100,
          duration: this.#duration,
          set: ({ value }) => `translateX(${value}%)`
        },
        opacity: {
          from: 1000,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        }

      }, {
        parallel: true,
      }),

    })

  }




  /**
   * SlideHorizontal  Transition
   */
  static get SlideHorizontal(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 100,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `translateX(${value}%)`
        },

      }, {
        parallel: true,
      }),

      out: new CoreAnimation({
        transform: {
          from: 0,
          to: 100,
          duration: this.#duration,
          set: ({ value }) => `translateX(${value}%)`
        },

      }, {
        parallel: true,
      }),

    })

  }




  /**
   * SlideVertical  Transition avec fondu
   */
  static get SlideFadedVertical(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 100,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `translateY(${value}%)`
        },

        opacity: {
          from: 0,
          to: 1000,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        },

      }, {
        parallel: true,
      }),

      out: new CoreAnimation({
        transform: {
          from: 0,
          to: 100,
          duration: this.#duration,
          set: ({ value }) => `translateY(${value}%)`
        },
        opacity: {
          from: 1000,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        }

      }, {
        parallel: true,
      }),

    })

  }




  /**
   * SlideVertical  Transition
   */
  static get SlideVertical(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 100,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `translateY(${value}%)`
        },

      }, {
        parallel: true,
      }),

      out: new CoreAnimation({
        transform: {
          from: 0,
          to: 100,
          duration: this.#duration,
          set: ({ value }) => `translateY(${value}%)`
        },

      }, {
        parallel: true,
      }),

    })

  }







  /**
   * SlideHorizontalReverse  Transition avec fondu
   */
  static get SlideFadedHorizontalReverse(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 100,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `translateX(-${value}%)`
        },

        opacity: {
          from: 0,
          to: 1000,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        },

      }, {
        parallel: true,
      }),

      out: new CoreAnimation({
        transform: {
          from: 0,
          to: 100,
          duration: this.#duration,
          set: ({ value }) => `translateX(-${value}%)`
        },
        opacity: {
          from: 1000,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        }

      }, {
        parallel: true,
      }),

    })

  }


  /**
   * SlideHorizontal  Transition
   */
  static get SlideHorizontalReverse(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 100,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `translateX(-${value}%)`
        },

      }, {
        parallel: true,
      }),

      out: new CoreAnimation({
        transform: {
          from: 0,
          to: 100,
          duration: this.#duration,
          set: ({ value }) => `translateX(-${value}%)`
        },

      }, {
        parallel: true,
      }),

    })

  }


  /**
   * SlideVertical  Transition avec fondu
   */
  static get SlideFadedVerticalReverse(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 100,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `translateY(-${value}%)`
        },

        opacity: {
          from: 0,
          to: 1000,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        },

      }, {
        parallel: true,
      }),

      out: new CoreAnimation({
        transform: {
          from: 0,
          to: 100,
          duration: this.#duration,
          set: ({ value }) => `translateY(-${value}%)`
        },
        opacity: {
          from: 1000,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `${value / 1000}`
        }

      }, {
        parallel: true,
      }),

    })

  }


  /**
   * SlideVerticalReverse  Transition
   */
  static get SlideVerticalReverse(): ICoreTransition {

    return new CoreTransition({

      in: new CoreAnimation({
        transform: {
          from: 100,
          to: 0,
          duration: this.#duration,
          set: ({ value }) => `translateY(-${value}%)`
        },

      }, {
        parallel: true,
      }),

      out: new CoreAnimation({
        transform: {
          from: 0,
          to: 100,
          duration: this.#duration,
          set: ({ value }) => `translateY(-${value}%)`
        },

      }, {
        parallel: true,
      }),

    })

  }




}


