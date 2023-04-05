import { MetricRandom } from "./metric";
import EventDispatcher from "./event-dispatcher";
import { ObjectToString, UnCamelize } from "./utilities";
/**
 * CoreAppearanceProps
 * @description Analyse la propriété de l'apparence et la réecrit
 * @param name Nom de la propriété
 * @param value Valeur de la propriété
 * @example
 * CoreAppearanceProps<IAppearanceObject>( { color : '#777' } )
 */
export function CoreAppearanceProps(name, value) {
    const keys = [];
    const parsed = {};
    /**
     * Réecriture
     */
    switch (name) {
        case 'paddingVertical':
            keys.push('paddingTop');
            keys.push('paddingBottom');
            break;
        case 'paddingHorizontal':
            keys.push('paddingLeft');
            keys.push('paddingRight');
            break;
        case 'marginVertical':
            keys.push('marginTop');
            keys.push('marginBottom');
            break;
        case 'marginHorizontal':
            keys.push('marginLeft');
            keys.push('marginRight');
            break;
        default:
            keys.push(name);
            break;
    }
    /**
     * Injection
     */
    keys.forEach(key => {
        parsed[UnCamelize(key)] = CoreAppearanceValues(value);
    });
    return parsed;
}
/**
 * CoreAppearanceValues
 * @description Analyse la valeur d'une propriété de l'apparence
 * @param value Valeur de la propriété
 * @example
 * CoreAppearanceValues( ... )
 */
export function CoreAppearanceValues(value) {
    if (typeof value == 'number') {
        return `${value}`;
    }
    return value;
}
/**
 * AUN Appearance
 * @description Gestionnaire d'apparence des éléments AUN
 */
export default class CoreAppearance {
    constructor() {
        /**
         * Instance de l'emetteur
         */
        this.emitter = new EventDispatcher();
        /**
         * Propriétés de l'apparence
         */
        this.properties = {};
        this.instance = document.createElement('style');
        this.uid = `${MetricRandom.CreateAplpha(4).join('')}-${MetricRandom.Create(12).join('')}`;
    }
    /**
     * sheet
     * C@description onstruire une feuille de style liée à l'apparence
     * @param stylesheet Definit la feuille de style
     * @example
     * appearance.sheet( {
     *    'selector' : {
     *       'property' : 'value',
     *        ...
     *    }
     * } )
     */
    sheet(stylesheet) {
        const styleSheet = [];
        Object.entries(stylesheet).forEach(({ 0: name, 1: props }) => {
            const properties = {};
            const selector = (name.includes('&'))
                ? name.replace(new RegExp('&', 'g'), `.${this.uid}`)
                : `.${this.uid} ${name}`;
            const data = this.insertProperties(properties, props);
            styleSheet[styleSheet.length] = `${selector}{ ${ObjectToString(data, { joiner: '; ' })} }`;
        });
        this.instance.innerHTML = styleSheet.join(' ');
        this.mountImmediat();
        return this;
    }
    /**
     * insertProperties
     * @description Insert des propriétés d'apparence dans un objet support. Analyse les propriétés et les valeurs avant de les insérer
     * @param properties Propriétés d'apparence support
     * @param data Données des propriétés à insérer
     * @example
     * appearance.insertProperties( objectPropertiesSupport, objectDataToInsert )
     */
    insertProperties(properties, data) {
        Object.entries(data).forEach(({ 0: name, 1: value }) => {
            Object.entries(CoreAppearanceProps(name, value)).forEach(({ 0: key, 1: data }) => properties[key] = data);
        });
        this.emitter.dispatch('insertProperties', properties);
        return properties;
    }
    /**
     * removeProperties
     * @description Supprime des propriétés d'apparence dans un object support.
     * @param properties Propriétés d'apparence support
     * @param payload Données des propriétés à supprimer
     * @example
     * appearance.removeProperties( objectPropertiesSupport, objectDataToRemove )
     */
    removeProperties(properties, payload) {
        Object.values(payload).forEach(name => {
            Object.entries(CoreAppearanceProps(name, undefined)).forEach(({ 0: key }) => properties[key] = undefined);
        });
        this.emitter.dispatch('removeProperties', properties);
        return properties;
    }
    /**
     * set
     * @description Insert des propriétés d'apparence. Analyse les propriétés et les valeurs avant de les insérer
     * @param properties Propriétés à insérer
     * @example
     * appearance.set( {
     *    'property' : 'value',
     *    ...
     * } )
     */
    set(properties) {
        this.insertProperties(this.properties, properties);
        this.emitter.dispatch('set', properties);
        return this.sync();
    }
    /**
     * unset
     * @description Supprime des propriétés d'apparence. Analyse les propriétés et les valeurs avant.
     * @param properties Propriétés à supprimer
     * @example
     * appearance.unset( {
     *    'property' : 'value',
     *    ...
     * } )
     */
    unset(properties) {
        this.removeProperties(this.properties, properties);
        this.emitter.dispatch('unset', properties);
        return this.sync();
    }
    /**
     * mount
     * @description Monter l'apparence si ce n'est pas fait
     * @example
     * appearance.mount()
     */
    mount() {
        const length = Object.values(this.properties).length;
        if (!this.instance.isConnected && length) {
            this.mountImmediat();
        }
        return this;
    }
    /**
     * mountImmediat
     * @description Monter l'apparence
     * @example
     * appearance.mountImmediat()
     */
    mountImmediat() {
        let head = document.querySelector('head');
        if (!head) {
            head = document.createElement('head');
            document.documentElement.append(head);
        }
        head.append(this.instance);
        this.emitter.dispatch('mount', this);
        return this;
    }
    /**
     * destroy
     * @description Détruit l'apparence
     * @example
     * appearance.destroy()
     */
    destroy() {
        this.instance.remove();
        this.emitter.dispatch('destroy', undefined);
        return this;
    }
    /**
     * sync
     * @description Synchronise l'apparence
     * @example
     * appearance.sync()
     */
    sync() {
        const rendering = [];
        Object.entries(this.properties).forEach(({ 0: name, 1: value }) => {
            if (typeof value == 'string' || typeof value == 'number') {
                rendering[rendering.length] = `${UnCamelize(name)} : ${value}`;
            }
        });
        this.instance.innerHTML = `.${this.uid}{ ${rendering.join(';')} }`;
        this.emitter.dispatch('sync', this);
        this.mount();
        return this;
    }
}
