import {IUiTarget} from "../types";

export function $Ui<T extends HTMLElement>(target: IUiTarget<T>): T[] {
    return typeof target === 'string' ? Array.from(document.querySelectorAll<T>(target)) : (Array.isArray(target) ? target : [target]);
}