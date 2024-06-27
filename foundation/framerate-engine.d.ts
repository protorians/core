import type { IFramerate, IFramerateEmitterScheme, IFramerateOptions, IFrameratePayload, IFramerateProps, IFramerateCollectionStateCallback, IFramerateCollection, IClimbing } from "../types";
import { PropertiesBag, EventDispatcher } from "../supports";
export declare class Framerate implements IFramerate {
    #private;
    emitter: EventDispatcher<IFramerateEmitterScheme>;
    get handler(): number | undefined;
    get options(): IFramerateOptions;
    get rawdelta(): number;
    get delta(): number;
    get sens(): boolean;
    get paused(): boolean;
    get stopped(): boolean;
    constructor(options: IFramerateOptions);
    get payload(): IFrameratePayload;
    syncronizeValue(x: number): number;
    reset(): this;
    stop(): this;
    start(): this;
    asyncStart(): Promise<IFramerate>;
}
export declare class FramerateCollection extends PropertiesBag<IFramerateProps> implements IFramerateCollection {
    /**
     * Jeu d'escalade pour l'excetion consécutive
     */
    climbing: IClimbing<IFramerate> | undefined;
    /**
     * Liste des FrameRate executés
     */
    protected executed: IFramerate[];
    get history(): IFramerate[];
    constructor(props: IFramerateProps);
    reset(): this;
    startParallel(callback?: IFramerateCollectionStateCallback): this;
    startConsecutive(callback?: IFramerateCollectionStateCallback): this;
    /**
     * Démarrage des FrameRates
     */
    start(callback?: IFramerateCollectionStateCallback): this;
}
