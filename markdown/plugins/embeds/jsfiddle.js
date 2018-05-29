"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (code) {
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
    return "<iframe class=\"w-100\" height=\"400\" src=\"" + embedUrl + "\"></iframe>";
});
