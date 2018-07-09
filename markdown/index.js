"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var twemoji = require("twemoji");
var Markdown = require("markdown-it");
var emoji = require("markdown-it-emoji");
var sanitize = require("markdown-it-sanitizer");
var katex_1 = require("./plugins/katex");
var highlight_1 = require("./plugins/highlight");
var utils_1 = require("./utils");
var embed_1 = require("./plugins/embed");
var linkify_mention_1 = require("./plugins/linkify-mention");
var defaultOptions = {
    baseURL: 'https://viblo.asia',
    embed: true,
    absoluteURL: true
};
function createRenderer(options) {
    var _options = Object.assign({}, defaultOptions, options);
    var md = Markdown({
        html: true,
        linkify: true
    });
    md.use(emoji);
    md.use(highlight_1.default);
    md.renderer.rules.emoji = function (token, idx) { return twemoji.parse(token[idx].content); };
    md.use(katex_1.default, {
        throwOnError: true,
        strict: true
    });
    utils_1.alterToken('link_open', function (token) {
        token.attrPush(['target', '_blank']);
        if (_options.absoluteURL) {
            var href = token.attrGet('href');
            if (href && href.startsWith('/')) {
                token.attrSet('href', "" + _options.baseURL + href);
            }
        }
        return token;
    }, md);
    md.linkify.add('@', linkify_mention_1.createDefinition(_options.baseURL + "/u"));
    if (_options.embed !== false) {
        var embedOptions = typeof _options.embed === 'object' ? _options.embed : {};
        var embedPlugin = embed_1.createPlugin(__assign({}, embedOptions, { baseURL: _options.baseURL }));
        md.use(embedPlugin);
    }
    md.use(sanitize);
    return md;
}
exports.createRenderer = createRenderer;
