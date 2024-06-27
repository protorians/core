import { Climbing } from "../supports";
import { IClimbingAsyncTask } from "../types";
export declare function useClimbing<R>(entries: Array<R>, callback: IClimbingAsyncTask<R>): Climbing<R>;
