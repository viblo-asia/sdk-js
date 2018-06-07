"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var parseSlideShareURL = function (code, baseURL) {
    var isSlideShareID = /^([0-9])+$/.test(code);
    var isSlideShareURL = /^(?:(?:http|https):\/\/)?(?:www\.)?(slideshare\.net\/.+)$/.test(code);
    var matchesEmbed = code.match(/^(?:(?:http|https):\/\/)?(?:www\.)?(slideshare\.net\/slideshow\/embed_code\/.+)$/);
    if (isSlideShareID) {
        return "https://slideshare.net/slideshow/embed_code/" + code;
    }
    if (!isSlideShareURL) {
        return '';
    }
    if (matchesEmbed) {
        return "https://" + matchesEmbed[1];
    }
    return baseURL + "/embed/slideshare/?url=" + code;
};
exports.default = (function (str, options) {
    var embedURL = parseSlideShareURL(str, options.baseURL || '');
    if (!embedURL)
        return str;
    return utils_1.renderEmbed({
        type: 'text/html',
        src: embedURL,
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
});
