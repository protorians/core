import {Climbing} from "../supports";
import {IClimbingAsyncTask} from "../types";

export function useClimbing<R>(entries : Array<R>, callback : IClimbingAsyncTask<R>){
  return new Climbing(entries, callback)
}