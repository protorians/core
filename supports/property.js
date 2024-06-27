"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
class Property {
    constructor(scheme) {
        this._map = new Map();
        this.originScheme = scheme || {};
        this.reset();
    }
    static context(scheme) {
        return new this(scheme);
    }
    get map() {
        return this._map;
    }
    get scheme() {
        return this._map.entries();
    }
    get values() {
        return this._map.values();
    }
    get keys() {
        return this._map.keys();
    }
    each(callback) {
        this._map.forEach(callback);
        return this;
    }
    set(key, value) {
        this._map.set(key, value);
        return this;
    }
    get(key) {
        return this._map.get(key);
    }
    exist(key) {
        return this._map.has(key);
    }
    fill(scheme) {
        Object.entries(scheme).forEach(([key, value]) => {
            this._map.set(key, value);
        });
        return this;
    }
    reset() {
        return this.fill(this.originScheme);
    }
    clear() {
        this._map.clear();
        return this;
    }
    delete(key) {
        this._map.delete(key);
        return this;
    }
}
exports.Property = Property;
//# sourceMappingURL=property.js.map