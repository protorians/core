/**
 * Protorian EventDispatcher — Emetteur d'émission
 * @description Gestionnaire d'évènements
 * @example new EventDispatcher<EmitScheme>()
 */
export default class EventDispatcher {
    constructor() {
        /**
         * Gestion de la propagation
         */
        this.propagations = {};
        /**
         * Stockage des émissions
         */
        this.entries = {};
    }
    /**
     * Ecouter une émission de l'émetteur
     * @description Ecouteur d'évèvements par rapport à un "SLUG". Utiliser un retour "TRUE" pour stopper la propagation de l'instance déclenchée
     * @param type Type d'émission déclaré dans le `Scheme` de l'instanciation
     * @param callback Fonction de rappel content en `argument[0]` les données définit par le dispatcher
     * @example emitter.listen<ReturnType>( 'emitterNameInKeyOfScheme', ( data : ReturnType ) => ... )
     */
    listen(type, callback, force) {
        this.entries[type] = this.entries[type] || [];
        this.entries[type].push({ callback, force });
        this.propagations[type] = false;
        return this;
    }
    /**
     * Déclencheur un type d'émission de l'émetteur
     * @description Déclencheur les écouteurs par rapport au `type`
     * @param type Type d'émission déclaré dans le `Scheme` de l'instanciation
     * @param data Donnée à renvoyer aux écouteurs d'émission de l'émeteur
     * @example emitter.dispatch( 'emitterNameInKeyOfScheme', ... )
     *
     */
    dispatch(type, data) {
        if (this.entries[type]) {
            this.entries[type].map((entry) => {
                if (this.propagations[type] === true) {
                    return;
                }
                const stop = entry.callback(data);
                if (stop === true) {
                    this.propagations[type] = true;
                }
            });
            this.propagations[type] = false;
        }
        return this;
    }
}
