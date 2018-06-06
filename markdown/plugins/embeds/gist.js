"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (code) {
    var regExp = /^(?:.*gist\.github\.com\/)([a-zA-Z0-9-]{0,38}\/[a-f0-9]+)$/;
    var match = code.match(regExp);
    if (!match) {
        return '';
    }
    var embedURL = "https://gist.github.com/" + match[1] + ".js";
    var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    var gistFrameHTML = "<html><body><script src='" + embedURL + "'></script></body></html>";
    return "<div class=\"embed-responsive embed-responsive-16by9\" style=\"overflow:visible\">\n        <iframe\n            id=\"" + id + "\"\n            class=\"embed-responsive-item\"\n            type=\"text/html\"\n            frameborder=\"0\"\n            scrolling=\"no\"\n            onload=\"this.style.height = this.contentDocument.body.scrollHeight + 'px'\"\n            srcdoc=\"" + gistFrameHTML + "\"></iframe>\n    </div>";
});
