"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNavigation = void 0;
const supports_1 = require("../supports");
function createNavigation(middleware) {
    const navigation = (new supports_1.Navigation());
    return middleware ? navigation.middleware(middleware) : navigation;
}
exports.createNavigation = createNavigation;
//# sourceMappingURL=navigation.js.map