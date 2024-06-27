"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PropertiesBag_props, _LayerComposite_layer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLChildComposite = exports.HTMLComposite = exports.LayerCompositeChild = exports.LayerComposite = exports.PropertiesBag = void 0;
class PropertiesBag {
    get properties() { return __classPrivateFieldGet(this, _PropertiesBag_props, "f"); }
    ;
    // property(name: keyof P): P[keyof P] | undefined { return this.#props[name]; }
    property(name) {
        return __classPrivateFieldGet(this, _PropertiesBag_props, "f")[name] || undefined;
    }
    setProperty(name, value) {
        __classPrivateFieldGet(this, _PropertiesBag_props, "f")[name] = value;
        return this;
    }
    constructor(props) {
        _PropertiesBag_props.set(this, void 0);
        __classPrivateFieldSet(this, _PropertiesBag_props, props, "f");
    }
}
exports.PropertiesBag = PropertiesBag;
_PropertiesBag_props = new WeakMap();
class LayerComposite extends PropertiesBag {
    get layer() { return __classPrivateFieldGet(this, _LayerComposite_layer, "f"); }
    constructor(element, props) {
        super(props);
        _LayerComposite_layer.set(this, void 0);
        this.layers = {};
        __classPrivateFieldSet(this, _LayerComposite_layer, element, "f");
    }
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
exports.LayerComposite = LayerComposite;
_LayerComposite_layer = new WeakMap();
class LayerCompositeChild extends LayerComposite {
    plug(parent) {
        this.parent = parent;
        return this;
    }
}
exports.LayerCompositeChild = LayerCompositeChild;
class HTMLComposite extends LayerComposite {
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
        if (childElement === null || childElement === void 0 ? void 0 : childElement.layer)
            this.layer.appendChild(childElement === null || childElement === void 0 ? void 0 : childElement.layer);
        return this;
    }
    appendElement(child) {
        if (child)
            this.layer.appendChild(child);
        return this;
    }
}
exports.HTMLComposite = HTMLComposite;
class HTMLChildComposite extends HTMLComposite {
}
exports.HTMLChildComposite = HTMLChildComposite;
//# sourceMappingURL=properties.js.map