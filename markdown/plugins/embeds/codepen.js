"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseCodepenURL = function (code) {
    var embedURL = code;
    if (!code.startsWith('https://codepen.io/')) {
        embedURL = "https://codepen.io/" + encodeURIComponent(code);
    }
    return embedURL.replace(new RegExp('/pen/'), '/embed/');
};
exports.default = (function (code) {
    var embedSrc = parseCodepenURL(code);
    return "<iframe\n                class=\"w-100\"\n                height=\"400\"\n                src=\"" + embedSrc + "?height=400&theme-id=0&default-tab=js,result&embed-version=2\"\n                frameborder=\"no\"\n                allowtransparency=\"true\"\n                allowFullScreen=\"true\"\n                webkitallowfullscreen=\"true\"\n                mozallowfullscreen=\"true\"></iframe>";
});
