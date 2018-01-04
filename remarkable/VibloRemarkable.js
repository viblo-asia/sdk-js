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
// import AsyncRemarkable from './remarkable/AsyncRemarkable'
var KatexPlugin_1 = require("./plugins/KatexPlugin");
var EmbedPlugin_1 = require("./plugins/EmbedPlugin");
var MentionsPlugin_1 = require("./plugins/MentionsPlugin");
var VibloRemarkable = /** @class */ (function (_super) {
    __extends(VibloRemarkable, _super);
    function VibloRemarkable(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        options = Object.assign({
            linkify: true,
            baseUrl: '',
        }, options);
        _this = _super.call(this, options) || this;
        _this.use(EmbedPlugin_1.EmbedPlugin);
        _this.use(MentionsPlugin_1.MentionsPlugin, {
            url: options.baseUrl + "/u",
            reserved: ['youtube', 'vimeo', 'codepen', 'gist', 'slideshare', 'googleslide']
        });
        _this.use(KatexPlugin_1.KatexPlugin, {
            throwOnError: false
        });
        return _this;
    }
    return VibloRemarkable;
}(Remarkable));
exports.VibloRemarkable = VibloRemarkable;
