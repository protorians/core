
import type {
  ILayerComposite,
  ILayerCompositeChild,
  ILayerComposites,
  IModelComposite,
  IProps
} from "./types";


export class ModelComposite<P> implements IModelComposite<P> {

  #props: P;

  get properties(): P { return this.#props };

  // property(name: keyof P): P[keyof P] | undefined { return this.#props[name]; }

  property(name: keyof P): P[keyof P] | undefined {

    return this.#props[name] || undefined;

  }

  setProperty(name: keyof P, value: P[keyof P]) {

    this.#props[name] = value;

    return this;

  }

  constructor(props: P) {

    this.#props = props;

  }

}





export class LayerComposite<Layer, P>

  extends ModelComposite<P>

  implements ILayerComposite<Layer> {

  get layer(): Layer { return this.#layer }

  #layer: Layer

  layers: ILayerComposites<Layer> = {};

  constructor(element: Layer, props: P) {

    super(props)

    this.#layer = element;

  }

  initialize(): this {

    return this;

  }

  createLayer(identifier: string): this {

    throw (`Method not implmented \n arguments : ${identifier}`)

  }

  removeLayer(identifier: string): this {

    throw (`Method not implmented \n arguments : ${identifier}`)

  }

  // layer(identifier: string): Layer | undefined {

  //   return this.layers[identifier] || undefined;

  // }

  render(): Layer {

    return this.layer;

  }

  append(childElement?: ILayerCompositeChild<Layer> | undefined): this {

    throw (`Method not implmented \n arguments : ${childElement}`)


  }

  appendElement(child?: Layer | undefined): this {

    throw (`Method not implmented \n arguments : ${child}`)


  }


}



export class LayerCompositeChild<Layer, P extends IProps>

  extends LayerComposite<Layer, P>

  implements ILayerCompositeChild<Layer> {

  parent?: ILayerComposite<Layer> | undefined;

  plug(parent: ILayerComposite<Layer>): this {

    this.parent = parent;

    return this;

  }

}







export class HTMLComposite<P>

  extends LayerComposite<HTMLElement, P>

{

  initialize(): this {

    return this;

  }

  createLayer(identifier: string, tagname?: keyof HTMLElementTagNameMap | undefined): this {

    this.layers[identifier] = document.createElement(tagname || 'div');

    return this;

  }

  removeLayer(identifier: string): this {

    if (this.layers[identifier]) this.layers[identifier].remove()

    return this;

  }

  render(): HTMLElement {

    return this.layer;

  }

  append(childElement?: ILayerCompositeChild<HTMLElement> | undefined): this {

    if (childElement?.layer) this.layer.appendChild(childElement?.layer)

    return this;

  }

  appendElement(child?: HTMLElement | undefined): this {

    if (child) this.layer.appendChild(child)

    return this;

  }

}


export class HTMLChildComposite<P extends IProps>

  extends HTMLComposite<P>

{

}


