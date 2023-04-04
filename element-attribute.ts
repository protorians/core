import type { 
  IElementAttribute, 
  IElementAttributesEmitterScheme 
} from "./types";
import EventDispatcher from "./event-dispatcher";

/**
 * AUN Attribute
 * @description Gestionnaire d'attribute dynamique
 */
export class ElementAttribute implements IElementAttribute {

  #entries : string[] = [];
  
  #element : HTMLElement | null = null;

  /**
   * Nom de lattribut
   */
  attributeName  = '';

  /**
   * Emetteur
   */
  emitter = new EventDispatcher<IElementAttributesEmitterScheme>()

  /**
   * Les entrées
   */
  get entries(){ return this.#entries; }

  /**
   * La valeur de l'attribut
   */
  get value(){ return this.#entries.filter( value => value.trim().length ).join(' ').trim(); }

  constructor( element : HTMLElement | null, attributeName  = '' ){

    this.#element = element;

    this.attributeName = attributeName;

    this.sync( this.attributeName );
    
  }

  /**
   * sync
   * @description Synchronise les attributs
   * @param attributeName Nom de l'attribut
   * @description
   * attribut.sync()
   */
  sync( attributeName ?: string ){

    this.attributeName = attributeName || this.attributeName;

    (this.#element?.getAttribute(`${ this.attributeName }`)||'').split(' ')

    .filter( value => value.trim().length )
    
    .map( value => this.add(`${ value.trim() }`))

    this.emitter.dispatch('sync', { entries : this.#entries })
    
    return this;
    
  }

  /**
   * add
   * @description Ajout une entrée à l'attribut
   * @param value Valeur de l'attribut
   * @example
   * attribut.add( ... )
   */
  add( value : string ){

    if( !this.contains( value ) ){

      this.#entries.push( value )

      this.emitter.dispatch('add', { added : value })
    
    }

    return this;
    
  }
  
  /**
   * remove
   * @description Supprimer une entrée de l'attribut
   * @param value Valeur de l'attribut
   * @example
   * attribut.remove( ... )
   */
  remove( value : string ){

    this.#entries = this.#entries.filter( entry => entry != value );

    this.emitter.dispatch('remove', { removed : value })
    
    return this;
    
  }

  /**
   * replace
   * @description Remplace le valeur dans un attribut
   * @param older Ancienne valeur de l'attribut
   * @param value Nouvelle valeur de l'attribut
   * @example
   * attribut.replace( 'oldValue', 'newValue' )
   */
  replace( older : string, value : string ){

    this.remove( older ).add( value )
    
    this.emitter.dispatch('replace', { older, newer : value })
    
    return this;
    
  }

  /**
   * contains
   * @description Recherche l'existence d'une valeur dans l'instance de l'attribut
   * @param value Valeur dans l'attribut recherché
   * @example 
   * attribut.contains( 'searchValue' )
   */
  contains( value : string ){

    return this.#entries.includes( value, 0 )
    
  }
  
  /**
   * link
   * @description Lie un attribut à une instance du DOM
   * @example
   * attribut.link()
   */
  link(){

    this.#element?.setAttribute( this.attributeName , `${ this.value }`)

    this.emitter.dispatch('link', this )
    
    return this;

  }
  
  /**
   * unlink
   * @description Supprime la liaison d'un attribut dans  l'instance
   * @param attributes Nom de l'attribut
   * @example
   * attribut.unlink( 'attributName' )
   */
  unlink( attributes ?: string | string[] ){

    if( attributes ){
      
      if( Array.isArray( attributes ) ){ attributes.map( attribute => this.remove( attribute ) ); }

      this.#element?.setAttribute( this.attributeName , `${ this.value }`)

      this.emitter.dispatch('unlink', { value : attributes || this.value })
    
    }

    else{

      this.#element?.removeAttribute( this.attributeName  )
      
      this.emitter.dispatch('unlinks', this )
    
    }

    return this;

  }


}
