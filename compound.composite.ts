
import type {
  ICompositeModel,
  IProps
} from "./types";


export class CompositeModel<P extends IProps> implements ICompositeModel {

  #props : P;

  get properties() : P{ return this.#props };

  property( name: keyof P ) : P[ keyof P] | undefined { return this.#props[ name ]; }

  
  constructor( props : P ){

    this.#props = props;
    
  }
  
}