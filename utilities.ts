'use-struct';

import type {
  ICoreAttributesMap,
  ICoreAttributesMapValues,
  IObjectToString,
  // IObjectData,
  // ISchemaValidators
} from "./types";

/**
 * URLParamsObject
 * @param searchParams Chaine de caractère des paramètres
 */
export function URLParamsObject<T>(searchParams: string) {

  if (searchParams) {

    searchParams = searchParams.trim()

    const out: T = {} as T;

    const f = searchParams.substring(0, 1);

    (f == '?' ? searchParams.substring(1) : searchParams).split('&').forEach(param => {

      const eq = param.split('=')

      const name = eq[0] as keyof T;

      if (name != 'child') {

        out[name] = (eq[1]) as any

      }

    })

    return out;

  }

  return undefined;

}

export function ObjectURLParams<T extends object>(params: T): string {

  return ObjectToString(params, { eq: '=', joiner: '&' })

}


/**
 * BrowseDOMPath
 * @description Parcour l'arbre de parent d'un element. Une fonction de validation peut stopper le parcour en retournant true. Chaque parent parcourut est renvoyer via la fonction de validation 
 * @param child Element à parcourir
 * @param validator Fonction de validation
 * @example
 * BrowseDOMPath( element, ( parent ) => ... )
 */
export function AscendingDOMPath<T extends Node | HTMLElement>(

  child: T,

  validator: (parent: T) => boolean

) {

  let node = child.parentElement;

  while (node != null) {

    if (validator(node as T) === true) { return node as T; }

    node = node.parentElement;

  }

  return undefined;

}



/**
 * UpdateObject
 * @description Mise à jour d'un objet à partir d'un autre objet
 * @param originalObject Object original
 * @param parameters À injecter
 */
export function UpdateObject<T>(

  originalObject: T,

  parameters?: Partial<T> | undefined

) {

  if (parameters) {

    Object.entries(parameters).forEach(({ 0: name, 1: parameter }) =>

      originalObject[name as keyof T] = parameter as T[keyof T]

    )

  }

  return originalObject;

}


/**
 * AttributesValuesAunrser
 * @description Analyse et donne la valeur en fonction du type
 * @param value Valeur de l'attribute
 * @example AttributesValuesAunrser( data )
 */
export function AttributesValuesAunrser(value: ICoreAttributesMapValues) {

  let parsed = value;

  if (typeof value == 'object' && value) {

    parsed = JSON.stringify(value)

  }

  return parsed;

}



/**
 * AttributesObject
 * @param attributes Charge utile
 * @param ns nom de l'espace — `ui:button="success"`
 * @param separator Chaine de caratère entre le nom d'espace et le nom de l'attribut
 */
export function AttributesObject<T extends ICoreAttributesMap>(

  attributes: ICoreAttributesMap,

  ns?: string | undefined,

  separator?: string | undefined

): T {

  const nms = (typeof ns != 'undefined' ? `${ns}${separator || '-'}` : '');

  let output: T = {} as T


  Object.entries(attributes).map(({ 0: name, 1: value }) => {

    if (typeof value == 'object' && value) {

      if (Array.isArray(value)) {

        const k = `${nms}${name}` as keyof T

        output[k] = `${AttributesValuesAunrser(value)}` as T[keyof T];

      }

      else {

        output = {

          ...output,

          ...AttributesObject(value, `${nms}${name}`, separator)

        }

      }

    }

    else if (typeof value != 'undefined') {

      const k = `${nms}${name}`

      output[k as keyof T] = `${AttributesValuesAunrser(value)}` as T[keyof T];

    }

  })

  return output;

}



export function ObjectToString(payload: object, c?: IObjectToString) {

  c = c || {};

  return Object.entries(payload)

    .map(({ 0: name, 1: value }) =>

      `${c?.start || ''}${name}${c?.eq || ':'}${value}${c?.end || ''}`

    )

    .join(c?.joiner || '')

}



/**
 * SafeText
 * @description Désactiver les crochets et quotes dans du texte
 */
export function safeText(text: string) {

  return text

    .replace(/&/g, '&amp;')

    .replace(/'/g, '&apos;')

    .replace(/"/g, '&quot;')

    .replace(/>/g, '&gt;')

    .replace(/</g, '&lt;')

}


/**
 * SafeText
 * @description Activer les crochets et quotes dans du texte
 */
export function unSafeText(text: string) {

  return text

    .replace(/&amp/g, '&')

    .replace(/&apos/g, "'")

    .replace(/&quot/g, '"')

    .replace(/&gt/g, '>')

    .replace(/&lt/g, '<')

}


/**
 * addSlashes
 * @description Désactiver les crochets et quotes dans du texte
 */
export function AddSlashes(text: string) {

  return text.replace(new RegExp("'", 'g'), "\\'")

}


/**
 * stripSlashes
 * @description Désactiver les crochets et quotes dans du texte
 */
export function StripSlashes(text: string) {

  return text.replace(new RegExp("\\'", 'g'), "'")

}



/**
 * uncamelize
 */
export function UnCamelize(value: string) {

  return (`${value[0].toLowerCase()}${value.substring(1)}`).replace(/([A-Z])/g, `-$&`).toLowerCase();

}


/**
 * camelize
 */
export function Camelize(value: string) {

  return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (text, index) =>

    index === 0 ? text.toLowerCase() : text.toUpperCase()

  ).replace(/\s+/g, '');

}






export function fixExponent(x: number) {

  let value = `${x}`

  if (Math.abs(x) < 1.0) {

    let e = parseInt(x.toString().split('e-')[1])

    if (e) {

      x *= Math.pow(10, e - 1);

      value = `0.${new Array(e).join('0')}${x.toString().substring(2)}`

    }

  }

  else {

    let e = parseInt(x.toString().split('+')[1])

    if (e > 20) {

      e -= 20;

      x /= Math.pow(10, e)

      value = `${x}${(new Array(e + 1)).join('0')}`

    }

  }


  return value;

}





export function CompareDateTime(from: string, to: string) {

  const _from = Date.parse(from)

  const _to = Date.parse(to)

  return _from < _to ? true : (

    _from == _to ? null : false

  )

}




// export function ObjectSchemaValidator(

//   input: IObjectData,

//   schemas: IObjectData,

// ): ISchemaValidators {

//   const validator: ISchemaValidators = {

//     score: 0,

//     hit: 0,

//     total: 0,

//     responses: []

//   }


//   Object.entries(input).map(({ 0: key, 1: value }) => {


//     if (

//       typeof schemas[key] == 'object' &&

//       typeof value == 'object'

//     ) {

//       const get = ObjectSchemaValidator(

//         value as IObjectData,

//         schemas[key] as IObjectData

//       );


//       validator.responses.push({

//         valid: (schemas[key] == value),

//         value,

//         expert: schemas[key]

//       });

//       if (schemas[key] == value) validator.hit++;


//     }


//     else {

//       validator.responses.push({

//         valid: (schemas[key] == value),

//         value,

//         expert: schemas[key]

//       });

//       if (schemas[key] == value) validator.hit++;

//     }

//   })


//   validator.score = (validator.hit / validator.total) * 100;

//   return validator;

// }
