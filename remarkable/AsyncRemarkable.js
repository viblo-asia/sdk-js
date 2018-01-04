"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Remarkable = require('remarkable');
var AsyncRenderer_1 = require("./AsyncRenderer");
var AsyncRemarkable = /** @class */ (function (_super) {
    __extends(AsyncRemarkable, _super);
    function AsyncRemarkable(preset, options) {
        var _this = _super.call(this, preset, options) || this;
        _this.renderer = new AsyncRenderer_1.AsyncRenderer();
        return _this;
    }
    return AsyncRemarkable;
}(Remarkable));
exports.AsyncRemarkable = AsyncRemarkable;
