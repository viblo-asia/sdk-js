"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (code) {
    if (code.startsWith('https://')) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = code.match(regExp);
        if (!match || match[7].length !== 11) {
            return '';
        }
        code = encodeURIComponent(match[7]);
    }
    return '<div class="embed-responsive embed-responsive-16by9">' +
        ("<iframe class=\"embed-responsive-item\" type=\"text/html\" src=\"https://www.youtube.com/embed/" + code + "\" frameborder=\"0\" allowFullScreen=\"true\" webkitallowfullscreen=\"true\" mozallowfullscreen=\"true\"></iframe>") +
        '</div>';
};
