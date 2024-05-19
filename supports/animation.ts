import type {
  ICoreAnimation,
  ICoreAnimationFeatures,
  ICoreAnimationOptions,
  IElementTarget,
  IAnimationStateCallback,
  IFramerate,
  IFramerateCollection,
  IAnimationCalibrate,
  ICoreAnimationFeature,
} from '../types';
import {FramerateCollection, Framerate} from '../foundation';


export class CoreAnimation implements ICoreAnimation {

  get features() {
    return this.#features
  }

  #features: ICoreAnimationFeatures;

  #frameRates?: IFramerateCollection;

  #options?: ICoreAnimationOptions;


  constructor(features: ICoreAnimationFeatures, options?: ICoreAnimationOptions) {

    this.#features = features;

    this.#options = options || ({} as ICoreAnimationOptions);

  }


  calibrate(
    feature: keyof ICoreAnimationFeatures,
    property: keyof IAnimationCalibrate,
    value: IAnimationCalibrate[keyof IAnimationCalibrate]
  ) {

    if (this.features[feature] != undefined) {

      const calibrate: ICoreAnimationFeature = {...this.#features[feature as any]}

      // @ts-ignore
      calibrate[property] = value;

      this.#features[feature as any] = calibrate

    }

    return this;

  }


  calibrates(
    property: keyof IAnimationCalibrate,
    value: IAnimationCalibrate[keyof IAnimationCalibrate]
  ): this {

    Object.entries(this.#features).forEach(({0: name}) => {

      this.calibrate(
        name as keyof ICoreAnimationFeatures,

        property,

        value
      )

    })

    return this;

  }


  reset(target: IElementTarget) {

    this.#frameRates = new FramerateCollection({

      parallel: this.#options?.parallel,

      infinite: this.#options?.infinite,

      entries: this.#createFrameRatesEntries(target)

    })

    return this;

  }


  #createFrameRatesEntries(target: IElementTarget) {

    const entries: IFramerate[] = [];

    (Object.entries(this.#features).forEach(({0: property, 1: animation}) => {

      entries.push(new Framerate({

        from: animation.from,

        to: animation.to,

        duration: animation.duration,

        ease: animation.ease,

        frame: (payload) => {

          if (target) {

            const propertyValue = animation.set(payload);

            target.style[property as any] = propertyValue

          }

        }

      }))


    }));

    return entries;

  }


  start(target: IElementTarget, callback?: IAnimationStateCallback) {

    this.reset(target);

    if (this.#frameRates) {

      this.#frameRates.start(() => {

        if (typeof callback == 'function') callback({animate: this, target,})

      });

    }

    return this;

  }

}




