"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppearance = exports.createAppearance = void 0;
const supports_1 = require("../supports");
function createAppearance(stylesheet) {
    return useAppearance().sheet(stylesheet);
}
exports.createAppearance = createAppearance;
function useAppearance() {
    return (new supports_1.CoreAppearance());
}
exports.useAppearance = useAppearance;
//# sourceMappingURL=appearance.js.map