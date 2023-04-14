import type {
  IFrameRate,
  IFrameRateEmitterScheme,
  IFrameRateOptions,
  IFrameRatePlayload,
  IFrameRateProps,
  IFrameRatesStateCallback,
  IFrameRates
} from "./types";
import { ModelComposite } from "./composite";
import Climbing from "./climbing";
import EventDispatcher from "./event-dispatcher";


export class FrameRate implements IFrameRate {


  emitter = new EventDispatcher<IFrameRateEmitterScheme>()

  #options: IFrameRateOptions;

  #current: IFrameRatePlayload = {} as IFrameRatePlayload

  #status: boolean = false;

  #paused: boolean = false;

  #stopped: boolean = false;

  #handler?: number = undefined;


  get handler(): number | undefined { return this.#handler }

  get options(): IFrameRateOptions { return this.#options; }

  get rawdelta() { return (this.#options.to - this.#options.from); }

  get delta() { return Math.abs(this.#options.to - this.#options.from); }

  get sens() { return (this.#options.to - this.#options.from) > 0 ? true : false; }

  get paused() { return this.#paused }

  get stopped() { return this.#stopped }



  constructor(options: IFrameRateOptions) {

    this.#options = options;

  }


  #initialize() {

    return this.reset();

  }

  get payload(): IFrameRatePlayload {

    return this.#current;

  }


  #prepare(time: number) {

    if (this.#current.started === undefined) {

      this.#current.started = time;

      this.emitter.dispatch('prepare', this);

    }

    return this;

  }

  #elapsed(time: number) {

    if (typeof this.#current.started == 'number') {

      this.#current.elapsed = time - this.#current.started;

      this.emitter.dispatch('updateElapsed', this);

    }

    return this;

  }


  #calculate(time: number) {

    if (typeof this.#current.elapsed == 'number') {

      if (this.#current.previous !== time) {

        const time = Math.min(this.#current.elapsed, this.options.duration);

        const quotient = (time / this.options.duration);

        const complete = time >= this.options.duration;


        if (this.#options.ease) {

          const percent = this.#options.ease.value(quotient) * 100;

          const value = (percent * this.delta) / 100;

          this.#options.frame({

            percent,

            value: this.syncronizeValue(value)

          })

        }

        if (!this.#options.ease) {

          const percent = quotient * 100;

          const value = (((percent) * (this.delta)) / 100);

          // const master = 

          this.#options.frame({

            percent,

            value: this.syncronizeValue(value)

          })

        }

        if (complete) {

          this.#status = true;

          // this.#options.frame({ percent: 100, value: this.options.to })

          this.emitter.dispatch('done', this);

          return this;

        }

      }

      this.emitter.dispatch('checkEnding', this);

    }


    return this;

  }

  #frame(time: number) {

    if (typeof this.#current.elapsed == 'number') {

      if (this.#current.elapsed < this.options.duration) {

        this.#current.previous = time;

        if (this.#status === false) {

          this.emitter.dispatch('frame', this);

          this.#handler = requestAnimationFrame(this.#playing.bind(this))

        }

      }

    }

    return this;

  }

  #playing() {


    // if( this.paused ){

    //   console.warn('Pause, standby', this.#paused )

    // }

    // else if( this.#stopped ){

    //   console.error('Stop, reset now', this.#stopped )

    //   this.reset();

    // }

    // else{

    this.#handler = requestAnimationFrame((time) => {

      // if( this.paused || this.#stopped ){

      //   console.log('standby', this.#current )

      // }

      // else{

      this

        .#prepare(time)

        .#elapsed(time)

        .#calculate(time)

        .#frame(time)

        ;

      // }


    })

    // }

    return this;

  }

  syncronizeValue(x: number): number {

    return (this.#options.from > this.#options.to

      ? this.#options.from - x

      : x - this.#options.from

    );

    // return this.sens ? x : this.delta - x;

  }

  reset() {

    this.#current.started = undefined;

    this.#current.elapsed = undefined;

    this.#current.previous = undefined;

    this.#status = false;

    this.#stopped = false;

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

    if (this.#handler) cancelAnimationFrame(this.#handler)

    this.#stopped = true;

    return this;

  }

  start() {

    return this.#initialize().#playing();

  }

  asyncStart() {

    return new Promise<IFrameRate>((done) => {

      this.emitter.listen('done', engine => done(engine))

      this.start();

    })

  }


}




export default class FrameRates extends ModelComposite<IFrameRateProps> implements IFrameRates {

  /**
   * Jeu d'escalade pour l'excetion consécutive
   */
  climbing: Climbing<IFrameRate> | undefined = undefined;

  /**
   * Liste des FrameRate executés
   */
  #executed: IFrameRate[] = [];


  constructor(props: IFrameRateProps) {

    super(props);

  }


  reset() {

    this.#executed = [];

    return this;

  }


  startParallel(callback?: IFrameRatesStateCallback) {

    Object.values(this.reset().properties.entries)

      .sort((a, b) => b.options.duration - a.options.duration)

      .forEach((entry, key) => {

        this.#executed.push(entry);

        if (key == 0) return entry.asyncStart().then(() => {

          if (typeof callback == 'function') callback(this);

          if (this.properties.infinite) this.start()


        })

        return entry.start()

      })

    return this;

  }



  startConsecutive(callback?: IFrameRatesStateCallback) {

    this.climbing = (new Climbing<IFrameRate>(this.properties.entries, (key) => {

      if (this.properties.entries[key]) this.#executed.push(this.properties.entries[key])

      return this.properties.entries[key]?.asyncStart()

    })).trigger(() => {

      if (typeof callback == 'function') callback(this);

      if (this.properties.infinite) this.start()

    })

    return this;

  }



  /**
   * Démarrage des FrameRates
   */
  start(callback?: IFrameRatesStateCallback): this {

    /**
     * Execution parallèle
     */
    if (this.properties.parallel) {

      this.startParallel(callback)

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




// (new FrameRate({
//   start: 0,
//   stop: 200,
//   duration: 1000,
// })).start()

