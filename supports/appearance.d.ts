import { EventDispatcher } from "./event-dispatcher";
import type { IAppearance, IAppearanceEmitterScheme, IAppearanceObject, IAppearanceObjectDestroyed, IAppearanceStyleSheet, IAppearanceValues } from "../types";
/**
 * CoreAppearanceProps
 * @description Analyse la propriété de l'apparence et la réecrit
 * @param name Nom de la propriété
 * @param value Valeur de la propriété
 * @example
 * CoreAppearanceProps<IAppearanceObject>( { color : '#777' } )
 */
export declare function CoreAppearanceProps<T extends IAppearanceObject | IAppearanceObjectDestroyed>(name: keyof IAppearanceObject, value: IAppearanceValues): T;
/**
 * CoreAppearanceValues
 * @description Analyse la valeur d'une propriété de l'apparence
 * @param value Valeur de la propriété
 * @example
 * CoreAppearanceValues( ... )
 */
export declare function CoreAppearanceValues(value: IAppearanceValues): string | undefined;
/**
 * AUN Appearance
 * @description Gestionnaire d'apparence des éléments AUN
 */
export declare class CoreAppearance implements IAppearance {
    /**
     * Instance du DOM
     */
    instance: HTMLStyleElement;
    /**
     * Signature de l'apparence
     */
    uid: string;
    /**
     * Instance de l'emetteur
     */
    emitter: EventDispatcher<IAppearanceEmitterScheme>;
    /**
     * Propriétés de l'apparence
     */
    properties: IAppearanceObject;
    constructor();
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
    sheet(stylesheet: IAppearanceStyleSheet): this;
    /**
     * inject
     * @description Inject du code CSS dans l'instance de l'apparence courante par substitution
     * @param code
     * @example
     *  appearance.inject("body{ color: red; }")
     */
    inject(code: string | string[]): this;
    /**
     * insertProperties
     * @description Insert des propriétés d'apparence dans un objet support. Analyse les propriétés et les valeurs avant de les insérer
     * @param properties Propriétés d'apparence support
     * @param data Données des propriétés à insérer
     * @example
     * appearance.insertProperties( objectPropertiesSupport, objectDataToInsert )
     */
    insertProperties(properties: IAppearanceObject, data: IAppearanceObject): IAppearanceObject;
    /**
     * removeProperties
     * @description Supprime des propriétés d'apparence dans un object support.
     * @param properties Propriétés d'apparence support
     * @param payload Données des propriétés à supprimer
     * @example
     * appearance.removeProperties( objectPropertiesSupport, objectDataToRemove )
     */
    removeProperties(properties: IAppearanceObject, payload: IAppearanceObjectDestroyed): IAppearanceObject;
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
    set(properties: IAppearanceObject): this;
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
    unset(properties: IAppearanceObjectDestroyed): this;
    /**
     * mount
     * @description Monter l'apparence si ce n'est pas fait
     * @example
     * appearance.mount()
     */
    mount(): this;
    /**
     * mountImmediat
     * @description Monter l'apparence
     * @example
     * appearance.mountImmediat()
     */
    mountImmediat(): this;
    /**
     * destroy
     * @description Détruit l'apparence
     * @example
     * appearance.destroy()
     */
    destroy(): this;
    /**
     * sync
     * @description Synchronise l'apparence
     * @example
     * appearance.sync()
     */
    sync(): this;
}
