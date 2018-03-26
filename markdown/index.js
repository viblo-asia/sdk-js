"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Markdown = require("markdown-it");
var emoji = require("markdown-it-emoji");
var twemoji = require("twemoji");
var katex_1 = require("./plugins/katex");
var highlight_1 = require("./plugins/highlight");
var linkify_mention_1 = require("./plugins/linkify-mention");
var embed_1 = require("./plugins/embed");
var codepen_1 = require("./plugins/embeds/codepen");
var gist_1 = require("./plugins/embeds/gist");
var google_slide_1 = require("./plugins/embeds/google-slide");
var slideshare_1 = require("./plugins/embeds/slideshare");
var vimeo_1 = require("./plugins/embeds/vimeo");
var youtube_1 = require("./plugins/embeds/youtube");
var defaultOptions = {
    baseURL: 'https://viblo.asia',
    embed: true
};
function createRenderer(options) {
    if (options === void 0) { options = defaultOptions; }
    var md = Markdown({
        highlight: highlight_1.default,
        html: true,
        linkify: true
    });
    md.use(emoji);
    md.renderer.rules.emoji = function (token, idx) { return twemoji.parse(token[idx].content); };
    md.use(katex_1.default, { throwOnError: false });
    var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        tokens[idx].attrPush(['target', '_blank']);
        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);
    };
    md.linkify.add('@', linkify_mention_1.createDefinition(options.baseURL + "/u"));
    if (options.embed !== false) {
        var embedPlugin = embed_1.createPlugin({
            codepen: codepen_1.default,
            gist: gist_1.default,
            googleslide: google_slide_1.default,
            slideshare: slideshare_1.default,
            vimeo: vimeo_1.default,
            youtube: youtube_1.default
        });
        md.use(embedPlugin);
    }
    return md;
}
exports.createRenderer = createRenderer;
