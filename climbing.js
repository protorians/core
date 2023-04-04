export default class Climbing {
    constructor(entries, callback) {
        /**
         * Tableau de réponse
         */
        this.responses = [];
        /**
         * Liste des étapes préparées
         */
        this.prepared = undefined;
        this.yield = this.create(entries, callback);
    }
    /**
     * Déclencher l'escalade
     * @param done Fonction de rappel quand l'escalade est complète
     * @param start Index à laquelle doit commencer l'escalade
     */
    trigger(done, start = 0) {
        this.next(this.yield(start), done);
        return this;
    }
    /**
     * Création de l'escalade
     * @param entries Tableau d'élément de type <R>
     * @param callback Fonction de rappel pour instancier une nouvelle entrée de l'escalade
     */
    create(entries, callback) {
        this.responses = [];
        return function* (index) {
            while (index < entries.length) {
                yield new Promise(async (done, fail) => {
                    if (typeof callback == 'function') {
                        const treatment = await callback(index)?.catch(er => fail(er));
                        if (treatment) {
                            done(treatment);
                        }
                        else {
                            throw ('Climbing Promise return undefined');
                        }
                    }
                });
                index++;
            }
        };
    }
    /**
     * Prochaine étape dans le tableau de l'escalade
     * @param prepared Préparation de la liste des étapes de l'escalade
     * @param next Fonction de rapel pour la prochaine étape dans l'escalade
     */
    next(prepared, next) {
        const instance = prepared.next();
        if (instance.done) {
            if (typeof next == 'function') {
                next(this);
            }
            return true;
        }
        instance.value.then(r => {
            this.responses.push(r);
            this.next(prepared, next);
        });
        return false;
    }
}
