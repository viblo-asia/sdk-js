"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = (function (code) {
    var embedURL = parseGoogleSlideURL(code);
    if (!embedURL) {
        return '';
    }
    return "<div class=\"embed-responsive embed-responsive-16by9\">\n        <iframe\n            class=\"embed-responsive-item\"\n            src=\"" + code + "\"\n            frameborder=\"0\"\n            allowfullscreen=\"true\"\n            mozallowfullscreen=\"true\"\n            webkitallowfullscreen=\"true\"></iframe>\n    </div>";
});
