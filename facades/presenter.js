"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePresenterController = exports.useOverlayPresenter = exports.useModalPresenter = exports.useCardPresenter = void 0;
const supports_1 = require("../supports");
function useCardPresenter(overlay, props) {
    return (new supports_1.CardPresenter(overlay, props));
}
exports.useCardPresenter = useCardPresenter;
function useModalPresenter(overlay, props) {
    return (new supports_1.ModalPresenter(overlay, props));
}
exports.useModalPresenter = useModalPresenter;
function useOverlayPresenter(overlay, props) {
    return (new supports_1.OverlayPresenter(overlay, props));
}
exports.useOverlayPresenter = useOverlayPresenter;
function usePresenterController(presenter) {
    return supports_1.Presenters.context(presenter);
}
exports.usePresenterController = usePresenterController;
//# sourceMappingURL=presenter.js.map