"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AscendingDOMPath = void 0;
function AscendingDOMPath(child, validator) {
    let node = child.parentElement;
    while (node != null) {
        if (validator(node)) {
            return node;
        }
        node = node.parentElement;
    }
    return undefined;
}
exports.AscendingDOMPath = AscendingDOMPath;
//# sourceMappingURL=html.js.map