import type { ILayerComposite, ILayerCompositeChild, ILayerComposites, IPropertiesBag, IProps } from "../types";
export declare class PropertiesBag<P> implements IPropertiesBag<P> {
    #private;
    get properties(): P;
    property(name: keyof P): P[keyof P] | undefined;
    setProperty(name: keyof P, value: P[keyof P]): this;
    constructor(props: P);
}
export declare class LayerComposite<Layer, P> extends PropertiesBag<P> implements ILayerComposite<Layer> {
    #private;
    get layer(): Layer;
    layers: ILayerComposites<Layer>;
    constructor(element: Layer, props: P);
    initialize(): this;
    createLayer(identifier: string): this;
    removeLayer(identifier: string): this;
    render(): Layer;
    append(childElement?: ILayerCompositeChild<Layer> | undefined): this;
    appendElement(child?: Layer | undefined): this;
}
export declare class LayerCompositeChild<Layer, P extends IProps> extends LayerComposite<Layer, P> implements ILayerCompositeChild<Layer> {
    parent?: ILayerComposite<Layer> | undefined;
    plug(parent: ILayerComposite<Layer>): this;
}
export declare class HTMLComposite<P> extends LayerComposite<HTMLElement, P> {
    initialize(): this;
    createLayer(identifier: string, tagname?: keyof HTMLElementTagNameMap | undefined): this;
    removeLayer(identifier: string): this;
    render(): HTMLElement;
    append(childElement?: ILayerCompositeChild<HTMLElement> | undefined): this;
    appendElement(child?: HTMLElement | undefined): this;
}
export declare class HTMLChildComposite<P extends IProps> extends HTMLComposite<P> {
}
