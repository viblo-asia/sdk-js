"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = (function (code) {
    var embedURL = parseVimeoURL(code);
    if (!embedURL) {
        return '';
    }
    return "<div class=\"embed-responsive embed-responsive-16by9\">\n        <iframe\n            class=\"embed-responsive-item\"\n            type=\"text/html\"\n            src=\"" + embedURL + "\"\n            frameborder=\"0\"\n            webkitallowfullscreen\n            mozallowfullscreen\n            allowfullscreen></iframe>\n    </div>";
});
