"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var encodeURI = function (uri) {
    return "https://player.vimeo.com/video/" + encodeURIComponent(uri);
};
var parseVimeoURL = function (code) {
    if (code.startsWith('https://')) {
        var regExp = /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
        var match = code.match(regExp);
        if (!match || match[5].length === 0) {
            return '';
        }
        return encodeURI(match[5]);
    }
    return encodeURI(code);
};
exports.default = (function (str, options) {
    var embedURL = parseVimeoURL(str);
    if (!embedURL) {
        return str;
    }
    return utils_1.renderEmbed({
        type: 'text/html',
        src: embedURL,
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
});
