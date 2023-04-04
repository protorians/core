

import type { 
  IElementAnimation,
  IElementAnimationFeatures,
  IElementAnimationOptions,
  IElementTarget, 
  IElementTransition, 
  IElementTransitionProps, 
  IFrameRate, 
  IFrameRates 
} from './types';
import { CompositeModel } from './composite'
import FrameRates, { FrameRate } from './framerate-engine';




export class ElementAnimation implements IElementAnimation {

  get features(){ return this.#features }

  #features: IElementAnimationFeatures;

  #frameRates ?: IFrameRates;

  #options ?: IElementAnimationOptions;



  constructor( features : IElementAnimationFeatures, options ?: IElementAnimationOptions ){

    this.#features = features;

    this.#options = options || ({} as IElementAnimationOptions);

  }


  reset( target : IElementTarget ){

    this.#frameRates = new FrameRates({

      parallel: this.#options?.parallel,

      infinite: this.#options?.infinite,
      
      entries: this.#createFrameRatesEntries( target )
      
    })

    return this;
    
  }
  

  #createFrameRatesEntries( target : IElementTarget ) {

    const entries : IFrameRate[] = [];

    (Object.entries( this.#features ).forEach( ({0:property, 1: animation}) => {

      entries.push( new FrameRate({

        from: animation.from,

        to: animation.to,
        
        duration: animation.duration,

        ease: animation.ease,

        frame: (payload) => {

          if( target ){

            const propertyValue = animation.set( payload );
  
            target.style[ property as any ] = propertyValue
            
          }
          
        }
        
      }) )
      
    }) );
    
    return entries;
    
  }

  start( target : IElementTarget ){

    this.reset( target );

    if( this.#frameRates ){

      this.#frameRates.start();
      
    }

    return this;
    
  }
  
}




export class ElementTransition extends CompositeModel<IElementTransitionProps> implements IElementTransition {

  currentMoment ?: boolean = undefined;

  constructor( props: IElementTransitionProps ){

    super( props );
    
  }
  
  startIn( target : IElementTarget ): this {

    this.currentMoment = true;

    this.properties.in.start( target )

    return this;
    
  }

  startOut( target : IElementTarget ): this {
      
    this.currentMoment = false;

    this.properties.out.start( target )

    return this;
    
  }
  
  toggle( target : IElementTarget ): this {

    if( this.currentMoment ) this.startOut( target ) 

    else this.startIn( target )
        
    return this;
    
  }
  
}




export class ElementTransitions{

  static get fade(){

    return new ElementTransition({

      in: new ElementAnimation({
        transform: {
            from: 0,
            to: 100,
            duration: 1000,
            set: ({ value })=> `scale(${ value / 100 })`
          }
  
      }),
      
      out: new ElementAnimation({
        transform: {
            from: 100,
            to: 0,
            duration: 1000,
            set: ({ value })=> `scale(${ value / 100 })`
          }
        
      }),
      
    })
    
  }

}



