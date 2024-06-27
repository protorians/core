import type { ICoreAttributesMap, ICoreAttributesMapValues, IObjectToString } from "../types";
export declare function UpdateObject<T>(originalObject: T, parameters?: Partial<T> | undefined): T;
export declare function AttributesValuesAunrser(value: ICoreAttributesMapValues): ICoreAttributesMapValues;
export declare function AttributesObject<T extends ICoreAttributesMap>(attributes: ICoreAttributesMap, ns?: string | undefined, separator?: string | undefined): T;
export declare function ObjectToString(payload: object, c?: IObjectToString): string;
