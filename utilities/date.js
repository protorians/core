"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareDateTime = void 0;
function CompareDateTime(from, to) {
    const _from = Date.parse(from);
    const _to = Date.parse(to);
    return _from < _to ? true : (_from == _to ? null : false);
}
exports.CompareDateTime = CompareDateTime;
//# sourceMappingURL=date.js.map