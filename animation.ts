

import type { 
  ICoreAnimation,
  ICoreAnimationFeatures,
  ICoreAnimationOptions,
  IElementTarget, 
  IAnimationStateCallback, 
  IFrameRate, 
  IFrameRates 
} from './types';
import FrameRates, { FrameRate } from './framerate-engine';




export class CoreAnimation implements ICoreAnimation {

  get features(){ return this.#features }

  #features: ICoreAnimationFeatures;

  #frameRates ?: IFrameRates;

  #options ?: ICoreAnimationOptions;



  constructor( features : ICoreAnimationFeatures, options ?: ICoreAnimationOptions ){

    this.#features = features;

    this.#options = options || ({} as ICoreAnimationOptions);

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

  
  start( target : IElementTarget, callback ?: IAnimationStateCallback ){

    this.reset( target );

    if( this.#frameRates ){

      this.#frameRates.start( ()=>{

        if( typeof callback == 'function' ) callback({ animate: this, target, })
        
      } );
      
    }

    return this;
    
  }
  
}




