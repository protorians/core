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
var _CoreAttribute_entries, _CoreAttribute_element;
import EventDispatcher from "./event-dispatcher";
/**
 * AUN Attribute
 * @description Gestionnaire d'attribute dynamique
 */
export class CoreAttribute {
    constructor(element, attributeName = '') {
        _CoreAttribute_entries.set(this, []);
        _CoreAttribute_element.set(this, null);
        /**
         * Nom de lattribut
         */
        this.attributeName = '';
        /**
         * Emetteur
         */
        this.emitter = new EventDispatcher();
        __classPrivateFieldSet(this, _CoreAttribute_element, element, "f");
        this.attributeName = attributeName;
        this.sync(this.attributeName);
    }
    /**
     * Les entrées
     */
    get entries() { return __classPrivateFieldGet(this, _CoreAttribute_entries, "f"); }
    /**
     * La valeur de l'attribut
     */
    get value() { return __classPrivateFieldGet(this, _CoreAttribute_entries, "f").filter(value => value.trim().length).join(' ').trim(); }
    /**
     * sync
     * @description Synchronise les attributs
     * @param attributeName Nom de l'attribut
     * @description
     * attribut.sync()
     */
    sync(attributeName) {
        this.attributeName = attributeName || this.attributeName;
        (__classPrivateFieldGet(this, _CoreAttribute_element, "f")?.getAttribute(`${this.attributeName}`) || '').split(' ')
            .filter(value => value.trim().length)
            .map(value => this.add(`${value.trim()}`));
        this.emitter.dispatch('sync', { entries: __classPrivateFieldGet(this, _CoreAttribute_entries, "f") });
        return this;
    }
    /**
     * add
     * @description Ajout une entrée à l'attribut
     * @param value Valeur de l'attribut
     * @example
     * attribut.add( ... )
     */
    add(value) {
        if (!this.contains(value)) {
            __classPrivateFieldGet(this, _CoreAttribute_entries, "f").push(value);
            this.emitter.dispatch('add', { added: value });
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
    remove(value) {
        __classPrivateFieldSet(this, _CoreAttribute_entries, __classPrivateFieldGet(this, _CoreAttribute_entries, "f").filter(entry => entry != value), "f");
        this.emitter.dispatch('remove', { removed: value });
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
    replace(older, value) {
        this.remove(older).add(value);
        this.emitter.dispatch('replace', { older, newer: value });
        return this;
    }
    /**
     * contains
     * @description Recherche l'existence d'une valeur dans l'instance de l'attribut
     * @param value Valeur dans l'attribut recherché
     * @example
     * attribut.contains( 'searchValue' )
     */
    contains(value) {
        return __classPrivateFieldGet(this, _CoreAttribute_entries, "f").includes(value, 0);
    }
    /**
     * link
     * @description Lie un attribut à une instance du DOM
     * @example
     * attribut.link()
     */
    link() {
        __classPrivateFieldGet(this, _CoreAttribute_element, "f")?.setAttribute(this.attributeName, `${this.value}`);
        this.emitter.dispatch('link', this);
        return this;
    }
    /**
     * unlink
     * @description Supprime la liaison d'un attribut dans  l'instance
     * @param attributes Nom de l'attribut
     * @example
     * attribut.unlink( 'attributName' )
     */
    unlink(attributes) {
        if (attributes) {
            if (Array.isArray(attributes)) {
                attributes.map(attribute => this.remove(attribute));
            }
            __classPrivateFieldGet(this, _CoreAttribute_element, "f")?.setAttribute(this.attributeName, `${this.value}`);
            this.emitter.dispatch('unlink', { value: attributes || this.value });
        }
        else {
            __classPrivateFieldGet(this, _CoreAttribute_element, "f")?.removeAttribute(this.attributeName);
            this.emitter.dispatch('unlinks', this);
        }
        return this;
    }
}
_CoreAttribute_entries = new WeakMap(), _CoreAttribute_element = new WeakMap();
