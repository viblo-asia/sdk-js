"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config(options) {
        this.oauth = options.oauth;
    }
    return Config;
}());
exports.Config = Config;
function init(options) {
    exports.config = new Config(options);
}
exports.init = init;
