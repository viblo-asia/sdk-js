"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
exports.default = (function (str, options) {
    var regExp = /^(?:.*gist\.github\.com\/)([a-zA-Z0-9-]{0,38}\/[a-f0-9]+)$/;
    var match = str.match(regExp);
    if (!match) {
        return str;
    }
    var embedURL = "https://gist.github.com/" + match[1] + ".js";
    var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    var gistFrameHTML = "<html><body><script src='" + embedURL + "'></script></body></html>";
    return utils_1.renderEmbed({
        id: id,
        type: 'text/html',
        srcdoc: gistFrameHTML,
        frameborder: 0
    }, options);
});
