"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectURLParams = exports.URLParamsObject = void 0;
const object_1 = require("./object");
function URLParamsObject(searchParams) {
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
exports.URLParamsObject = URLParamsObject;
function ObjectURLParams(params) {
    return (0, object_1.ObjectToString)(params, { eq: '=', joiner: '&' });
}
exports.ObjectURLParams = ObjectURLParams;
//# sourceMappingURL=url.js.map