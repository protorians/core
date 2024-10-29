import type {ICoreAttributesMap, ICoreAttributesMapValues} from "../types/attribute";
import type {IObjectToString} from "../types/value";


export function UpdateObject<T>(
  originalObject: T,
  parameters?: Partial<T> | undefined
) {

  if (parameters) {

    Object.entries(parameters).forEach(({0: name, 1: parameter}) =>

      originalObject[name as keyof T] = parameter as T[keyof T]
    )

  }

  return originalObject;

}


export function AttributesValuesAunrser(value: ICoreAttributesMapValues) {

  let parsed = value;

  if (typeof value == 'object' && value) {

    parsed = JSON.stringify(value)

  }

  return parsed;

}


export function AttributesObject<T extends ICoreAttributesMap>(
  attributes: ICoreAttributesMap,
  ns?: string | undefined,
  separator?: string | undefined
): T {

  const nms = (typeof ns != 'undefined' ? `${ns}${separator || '-'}` : '');

  let output: T = {} as T


  Object.entries(attributes).map(({0: name, 1: value}) => {

    if (typeof value == 'object' && value) {

      if (Array.isArray(value)) {

        const k = `${nms}${name}` as keyof T

        output[k] = `${AttributesValuesAunrser(value)}` as T[keyof T];

      } else {

        output = {

          ...output,

          ...AttributesObject(value, `${nms}${name}`, separator)

        }

      }

    } else if (typeof value != 'undefined') {

      const k = `${nms}${name}`

      output[k as keyof T] = `${AttributesValuesAunrser(value)}` as T[keyof T];

    }

  })

  return output;

}


export function ObjectToString(payload: object, c?: IObjectToString) {

  c = c || {};

  return Object.entries(payload)

    .map(({0: name, 1: value}) =>

      `${c?.start || ''}${name}${c?.eq || ':'}${value}${c?.end || ''}`
    )

    .join(c?.joiner || '')

}
