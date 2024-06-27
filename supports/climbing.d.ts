import type { IClimbing, IClimbingAsyncTask, IClimbingNext, IClimbingTask, IClimbingYield } from "../types";
export declare class Climbing<R> implements IClimbing<R> {
    /**
     * Tableau de réponse
     */
    responses: Array<R>;
    /**
     * Liste des étapes préparées
     */
    prepared: IClimbingTask<R> | undefined;
    /**
     * Fonction de rendement
     */
    yield: IClimbingYield<R>;
    constructor(entries: Array<R>, callback: IClimbingAsyncTask<R>);
    /**
     * Déclencher l'escalade
     * @param done Fonction de rappel quand l'escalade est complète
     * @param start Index à laquelle doit commencer l'escalade
     */
    trigger(done: IClimbingNext<R>, start?: number): this;
    /**
     * Création de l'escalade
     * @param entries Tableau d'élément de type <R>
     * @param callback Fonction de rappel pour instancier une nouvelle entrée de l'escalade
     */
    create(entries: Array<R>, callback: IClimbingAsyncTask<R>): IClimbingYield<R>;
    /**
     * Prochaine étape dans le tableau de l'escalade
     * @param prepared Préparation de la liste des étapes de l'escalade
     * @param next Fonction de rapel pour la prochaine étape dans l'escalade
     */
    next(prepared: IClimbingTask<R>, next: IClimbingNext<R>): boolean;
}
