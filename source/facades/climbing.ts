import type {IClimbingAsyncTask} from "../types/climbing";
import {Climbing} from "../supports/climbing";

export function useClimbing<R>(entries : Array<R>, callback : IClimbingAsyncTask<R>){
  return new Climbing(entries, callback)
}