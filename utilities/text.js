"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixExponent = exports.Camelize = exports.UnCamelize = exports.StripSlashes = exports.AddSlashes = exports.unSafeText = exports.safeText = void 0;
function safeText(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
}
exports.safeText = safeText;
function unSafeText(text) {
    return text
        .replace(/&amp/g, '&')
        .replace(/&apos/g, "'")
        .replace(/&quot/g, '"')
        .replace(/&gt/g, '>')
        .replace(/&lt/g, '<');
}
exports.unSafeText = unSafeText;
function AddSlashes(text) {
    return text.replace(new RegExp("'", 'g'), "\\'");
}
exports.AddSlashes = AddSlashes;
function StripSlashes(text) {
    return text.replace(new RegExp("\\'", 'g'), "'");
}
exports.StripSlashes = StripSlashes;
function UnCamelize(value) {
    return (`${value[0].toLowerCase()}${value.substring(1)}`).replace(/([A-Z])/g, `-$&`).toLowerCase();
}
exports.UnCamelize = UnCamelize;
function Camelize(value) {
    return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (text, index) => index === 0 ? text.toLowerCase() : text.toUpperCase()).replace(/\s+/g, '');
}
exports.Camelize = Camelize;
function fixExponent(x) {
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
exports.fixExponent = fixExponent;
//# sourceMappingURL=text.js.map