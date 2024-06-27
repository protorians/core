"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnimation = void 0;
const supports_1 = require("../supports");
function createAnimation(features, options) {
    return (new supports_1.CoreAnimation(features, options));
}
exports.createAnimation = createAnimation;
//# sourceMappingURL=animation.js.map