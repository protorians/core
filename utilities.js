'use-struct';
/**
 * URLParamsObject
 * @param searchParams Chaine de caractère des paramètres
 */
export function URLParamsObject(searchParams) {
    if (searchParams) {
        searchParams = searchParams.trim();
        const out = {};
        const f = searchParams.substring(0, 1);
        (f == '?' ? searchParams.substring(1) : searchParams).split('&').forEach(param => {
            const eq = param.split('=');
            const name = eq[0];
            if (name != 'child') {
                out[name] = (eq[1]);
            }
        });
        return out;
    }
    return undefined;
}
export function ObjectURLParams(params) {
    return ObjectToString(params, { eq: '=', joiner: '&' });
}
/**
 * BrowseDOMPath
 * @description Parcour l'arbre de parent d'un element. Une fonction de validation peut stopper le parcour en retournant true. Chaque parent parcourut est renvoyer via la fonction de validation
 * @param child Element à parcourir
 * @param validator Fonction de validation
 * @example
 * BrowseDOMPath( element, ( parent ) => ... )
 */
export function AscendingDOMPath(child, validator) {
    let node = child.parentElement;
    while (node != null) {
        if (validator(node) === true) {
            return node;
        }
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
export function UpdateObject(originalObject, parameters) {
    if (parameters) {
        Object.entries(parameters).forEach(({ 0: name, 1: parameter }) => originalObject[name] = parameter);
    }
    return originalObject;
}
/**
 * AttributesValuesAunrser
 * @description Analyse et donne la valeur en fonction du type
 * @param value Valeur de l'attribute
 * @example AttributesValuesAunrser( data )
 */
export function AttributesValuesAunrser(value) {
    let parsed = value;
    if (typeof value == 'object' && value) {
        parsed = JSON.stringify(value);
    }
    return parsed;
}
/**
 * AttributesObject
 * @param attributes Charge utile
 * @param ns nom de l'espace — `ui:button="success"`
 * @param separator Chaine de caratère entre le nom d'espace et le nom de l'attribut
 */
export function AttributesObject(attributes, ns, separator) {
    const nms = (typeof ns != 'undefined' ? `${ns}${separator || '-'}` : '');
    let output = {};
    Object.entries(attributes).map(({ 0: name, 1: value }) => {
        if (typeof value == 'object' && value) {
            if (Array.isArray(value)) {
                const k = `${nms}${name}`;
                output[k] = `${AttributesValuesAunrser(value)}`;
            }
            else {
                output = {
                    ...output,
                    ...AttributesObject(value, `${nms}${name}`, separator)
                };
            }
        }
        else if (typeof value != 'undefined') {
            const k = `${nms}${name}`;
            output[k] = `${AttributesValuesAunrser(value)}`;
        }
    });
    return output;
}
export function ObjectToString(payload, c) {
    c = c || {};
    return Object.entries(payload)
        .map(({ 0: name, 1: value }) => `${c?.start || ''}${name}${c?.eq || ':'}${value}${c?.end || ''}`)
        .join(c?.joiner || '');
}
/**
 * SafeText
 * @description Désactiver les crochets et quotes dans du texte
 */
export function safeText(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
}
/**
 * SafeText
 * @description Activer les crochets et quotes dans du texte
 */
export function unSafeText(text) {
    return text
        .replace(/&amp/g, '&')
        .replace(/&apos/g, "'")
        .replace(/&quot/g, '"')
        .replace(/&gt/g, '>')
        .replace(/&lt/g, '<');
}
/**
 * addSlashes
 * @description Désactiver les crochets et quotes dans du texte
 */
export function AddSlashes(text) {
    return text.replace(new RegExp("'", 'g'), "\\'");
}
/**
 * stripSlashes
 * @description Désactiver les crochets et quotes dans du texte
 */
export function StripSlashes(text) {
    return text.replace(new RegExp("\\'", 'g'), "'");
}
/**
 * uncamelize
 */
export function UnCamelize(value) {
    return (`${value[0].toLowerCase()}${value.substring(1)}`).replace(/([A-Z])/g, `-$&`).toLowerCase();
}
/**
 * camelize
 */
export function Camelize(value) {
    return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (text, index) => index === 0 ? text.toLowerCase() : text.toUpperCase()).replace(/\s+/g, '');
}
export function fixExponent(x) {
    let value = `${x}`;
    if (Math.abs(x) < 1.0) {
        let e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            value = `0.${new Array(e).join('0')}${x.toString().substring(2)}`;
        }
    }
    else {
        let e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            value = `${x}${(new Array(e + 1)).join('0')}`;
        }
    }
    return value;
}
export function CompareDateTime(from, to) {
    const _from = Date.parse(from);
    const _to = Date.parse(to);
    return _from < _to ? true : (_from == _to ? null : false);
}
