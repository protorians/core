"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectToString = exports.AttributesObject = exports.AttributesValuesAunrser = exports.UpdateObject = void 0;
function UpdateObject(originalObject, parameters) {
    if (parameters) {
        Object.entries(parameters).forEach(({ 0: name, 1: parameter }) => originalObject[name] = parameter);
    }
    return originalObject;
}
exports.UpdateObject = UpdateObject;
function AttributesValuesAunrser(value) {
    let parsed = value;
    if (typeof value == 'object' && value) {
        parsed = JSON.stringify(value);
    }
    return parsed;
}
exports.AttributesValuesAunrser = AttributesValuesAunrser;
function AttributesObject(attributes, ns, separator) {
    const nms = (typeof ns != 'undefined' ? `${ns}${separator || '-'}` : '');
    let output = {};
    Object.entries(attributes).map(({ 0: name, 1: value }) => {
        if (typeof value == 'object' && value) {
            if (Array.isArray(value)) {
                const k = `${nms}${name}`;
                output[k] = `${AttributesValuesAunrser(value)}`;
            }
            else {
                output = Object.assign(Object.assign({}, output), AttributesObject(value, `${nms}${name}`, separator));
            }
        }
        else if (typeof value != 'undefined') {
            const k = `${nms}${name}`;
            output[k] = `${AttributesValuesAunrser(value)}`;
        }
    });
    return output;
}
exports.AttributesObject = AttributesObject;
function ObjectToString(payload, c) {
    c = c || {};
    return Object.entries(payload)
        .map(({ 0: name, 1: value }) => `${(c === null || c === void 0 ? void 0 : c.start) || ''}${name}${(c === null || c === void 0 ? void 0 : c.eq) || ':'}${value}${(c === null || c === void 0 ? void 0 : c.end) || ''}`)
        .join((c === null || c === void 0 ? void 0 : c.joiner) || '');
}
exports.ObjectToString = ObjectToString;
//# sourceMappingURL=object.js.map