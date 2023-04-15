var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ModelComposite_props, _LayerComposite_layer;
export class ModelComposite {
    constructor(props) {
        _ModelComposite_props.set(this, void 0);
        __classPrivateFieldSet(this, _ModelComposite_props, props, "f");
    }
    get properties() { return __classPrivateFieldGet(this, _ModelComposite_props, "f"); }
    ;
    // property(name: keyof P): P[keyof P] | undefined { return this.#props[name]; }
    property(name) {
        return __classPrivateFieldGet(this, _ModelComposite_props, "f")[name] || undefined;
    }
    setProperty(name, value) {
        __classPrivateFieldGet(this, _ModelComposite_props, "f")[name] = value;
        return this;
    }
}
_ModelComposite_props = new WeakMap();
export class LayerComposite extends ModelComposite {
    constructor(element, props) {
        super(props);
        _LayerComposite_layer.set(this, void 0);
        this.layers = {};
        __classPrivateFieldSet(this, _LayerComposite_layer, element, "f");
    }
    get layer() { return __classPrivateFieldGet(this, _LayerComposite_layer, "f"); }
    initialize() {
        return this;
    }
    createLayer(identifier) {
        throw (`Method not implmented \n arguments : ${identifier}`);
    }
    removeLayer(identifier) {
        throw (`Method not implmented \n arguments : ${identifier}`);
    }
    // layer(identifier: string): Layer | undefined {
    //   return this.layers[identifier] || undefined;
    // }
    render() {
        return this.layer;
    }
    append(childElement) {
        throw (`Method not implmented \n arguments : ${childElement}`);
    }
    appendElement(child) {
        throw (`Method not implmented \n arguments : ${child}`);
    }
}
_LayerComposite_layer = new WeakMap();
export class LayerCompositeChild extends LayerComposite {
    plug(parent) {
        this.parent = parent;
        return this;
    }
}
export class HTMLComposite extends LayerComposite {
    initialize() {
        return this;
    }
    createLayer(identifier, tagname) {
        this.layers[identifier] = document.createElement(tagname || 'div');
        return this;
    }
    removeLayer(identifier) {
        if (this.layers[identifier])
            this.layers[identifier].remove();
        return this;
    }
    render() {
        return this.layer;
    }
    append(childElement) {
        if (childElement?.layer)
            this.layer.appendChild(childElement?.layer);
        return this;
    }
    appendElement(child) {
        if (child)
            this.layer.appendChild(child);
        return this;
    }
}
export class HTMLChildComposite extends HTMLComposite {
}
