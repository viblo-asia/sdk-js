"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseSlideshareURL = function (code) {
    if (!code.startsWith('http') && !code.match(/^(http|https):\/\/slideshare.net\/slideshow\/embed_code\/.*/)) {
        return "https://slideshare.net/slideshow/embed_code/" + encodeURIComponent(code);
    }
    return code;
};
exports.default = (function (code) {
    var embedURL = parseSlideshareURL(code);
    return "<div class=\"embed-responsive embed-responsive-16by9\">\n        <iframe\n            class=\"embed-responsive-item\"\n            type=\"text/html\"\n            src=\"" + embedURL + "\"\n            frameborder=\"0\"\n            allowFullScreen=\"true\"\n            webkitallowfullscreen=\"true\"\n            mozallowfullscreen=\"true\"></iframe>\n    </div>";
});
