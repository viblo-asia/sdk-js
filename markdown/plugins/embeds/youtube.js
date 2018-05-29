"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = (function (code) {
    var embedURL = parseYoutubeURL(code);
    return !embedURL ? '' : "<div class=\"embed-responsive embed-responsive-16by9\">\n        <iframe\n            class=\"embed-responsive-item\"\n            type=\"text/html\"\n            src=\"https://www.youtube.com/embed/" + embedURL + "\"\n            frameborder=\"0\"\n            allowFullScreen=\"true\"\n            webkitallowfullscreen=\"true\"\n            mozallowfullscreen=\"true\"></iframe>\n    </div>";
});
