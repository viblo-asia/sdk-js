"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
exports.default = (function (code, options) {
    var embedUrl = code.replace(/^\/+|\/+$/gm, '')
        .replace(/(^http\:\/\/jsfiddle.net\/)|(^jsfiddle.net\/)/, 'https://jsfiddle.net/')
        .replace('/embed', '/embedded');
    if (!embedUrl.startsWith('https://jsfiddle.net/')) {
        embedUrl = "https://jsfiddle.net/" + embedUrl;
    }
    // Support jsFiddle Url:
    if (/^https:\/\/jsfiddle\.net(?:\/[^\s\/]+){2}$/.test(embedUrl)) {
        embedUrl = embedUrl + "/embedded";
    }
    return utils_1.renderEmbed({
        src: embedUrl,
        height: 400
    }, options);
});
