"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var encodeURI = function (uri) {
    return "https://docs.google.com/presentation/d/" + encodeURIComponent(uri) + "/embed"
        + "?start=false&loop=false&delayms=3000";
};
var parseGoogleSlideURL = function (code) {
    if (code.startsWith('https://docs.google.com/presentation/d/')) {
        var match = code.match(/[-\w]{25,}/);
        return !match ? '' : encodeURI(match[0]);
    }
    return encodeURI(code);
};
exports.default = (function (code, options) {
    var embedURL = parseGoogleSlideURL(code);
    if (!embedURL) {
        return '';
    }
    return utils_1.renderEmbed({
        src: embedURL,
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
});
