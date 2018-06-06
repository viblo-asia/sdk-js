"use strict";
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
var codepen_1 = require("./plugins/embeds/codepen");
var jsfiddle_1 = require("./plugins/embeds/jsfiddle");
var gist_1 = require("./plugins/embeds/gist");
var google_slide_1 = require("./plugins/embeds/google-slide");
var slideshare_1 = require("./plugins/embeds/slideshare");
var vimeo_1 = require("./plugins/embeds/vimeo");
var youtube_1 = require("./plugins/embeds/youtube");
var defaultOptions = {
    baseURL: 'https://viblo.asia',
    embed: true,
    absoluteURL: true
};
function createRenderer(options) {
    var mergedOptions = Object.assign({}, defaultOptions, options);
    var slideshare = slideshare_1.default({
        baseURL: mergedOptions.baseURL
    });
    var embedPlugin = embed_1.createPlugin({
        codepen: codepen_1.default,
        jsfiddle: jsfiddle_1.default,
        gist: gist_1.default,
        googleslide: google_slide_1.default,
        vimeo: vimeo_1.default,
        youtube: youtube_1.default,
        slideshare: slideshare
    });
    var md = Markdown({
        highlight: highlight_1.default,
        html: true,
        linkify: true
    });
    md.use(emoji);
    md.renderer.rules.emoji = function (token, idx) { return twemoji.parse(token[idx].content); };
    md.use(katex_1.default, { throwOnError: false });
    /* tslint:disable:align */
    utils_1.alterToken('link_open', function (token) {
        token.attrPush(['target', '_blank']);
        if (mergedOptions.absoluteURL) {
            var href = token.attrGet('href');
            if (href && href.startsWith('/')) {
                token.attrSet('href', "" + mergedOptions.baseURL + href);
            }
        }
        return token;
    }, md);
    /* tslint:enable:align */
    md.linkify.add('@', linkify_mention_1.createDefinition(mergedOptions.baseURL + "/u"));
    if (mergedOptions.embed !== false) {
        md.use(embedPlugin);
    }
    md.use(sanitize);
    return md;
}
exports.createRenderer = createRenderer;
