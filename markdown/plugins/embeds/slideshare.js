"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = (function (_a) {
    var baseURL = _a.baseURL;
    return function (code) {
        var embedURL = parseSlideShareURL(code, baseURL);
        if (!embedURL)
            return code;
        return "<div class=\"embed-responsive embed-responsive-16by9\">\n        <iframe\n            class=\"embed-responsive-item\"\n            type=\"text/html\"\n            src=\"" + embedURL + "\"\n            frameborder=\"0\"\n            allowFullScreen=\"true\"\n            webkitallowfullscreen=\"true\"\n            mozallowfullscreen=\"true\"></iframe>\n    </div>";
    };
});
