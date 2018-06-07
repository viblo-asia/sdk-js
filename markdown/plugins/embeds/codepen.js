"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var parseCodepenURL = function (code) {
    var embedURL = code;
    if (!code.startsWith('https://codepen.io/')) {
        embedURL = "https://codepen.io/" + encodeURIComponent(code);
    }
    return embedURL.replace(new RegExp('/pen/'), '/embed/');
};
exports.default = (function (str, options) {
    var embedSrc = parseCodepenURL(str);
    var classAttr = options.iframeClass ? "class=\"" + options.iframeClass + "\"" : '';
    return utils_1.renderEmbed({
        height: 400,
        src: embedSrc + "?height=400&theme-id=0&default-tab=js,result&embed-version=2",
        frameborder: 0,
        allowtransparency: true,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
});
