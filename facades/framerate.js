"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.framerateCollection = exports.framerate = exports.createFramerateEase = void 0;
const supports_1 = require("../supports");
function createFramerateEase(name, cubicBezier, formula) {
    return (new supports_1.FrameRateEasing(name, cubicBezier, formula));
}
exports.createFramerateEase = createFramerateEase;
function framerate(options) {
    return (new supports_1.Framerate(options));
}
exports.framerate = framerate;
function framerateCollection(options) {
    return (new supports_1.FramerateCollection(options));
}
exports.framerateCollection = framerateCollection;
//# sourceMappingURL=framerate.js.map