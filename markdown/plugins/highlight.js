"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hljs = require("highlight.js");
function default_1(str, lang) {
    try {
        return lang && hljs.getLanguage(lang)
            ? hljs.highlight(lang, str).value
            : hljs.highlightAuto(str).value;
    }
    catch (e) {
        return str;
    }
}
exports.default = default_1;
