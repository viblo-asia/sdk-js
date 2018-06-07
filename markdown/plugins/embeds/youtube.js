"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var parseYoutubeURL = function (code) {
    if (code.startsWith('https://')) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = code.match(regExp);
        if (!match || match[7].length !== 11) {
            return '';
        }
        return encodeURIComponent(match[7]);
    }
    return code;
};
exports.default = (function (str, options) {
    var embedURL = parseYoutubeURL(str);
    if (!embedURL) {
        return str;
    }
    return utils_1.renderEmbed({
        type: 'text/html',
        src: "https://www.youtube.com/embed/" + embedURL,
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
});
