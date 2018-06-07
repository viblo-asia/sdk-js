"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gist_1 = require("./embeds/gist");
var vimeo_1 = require("./embeds/vimeo");
var codepen_1 = require("./embeds/codepen");
var youtube_1 = require("./embeds/youtube");
var jsfiddle_1 = require("./embeds/jsfiddle");
var slideshare_1 = require("./embeds/slideshare");
var google_slide_1 = require("./embeds/google-slide");
var regexp = /{@(\w+)\s*:\s*([\S]+?)}/;
var sites = {
    gist: gist_1.default,
    vimeo: vimeo_1.default,
    codepen: codepen_1.default,
    youtube: youtube_1.default,
    jsfiddle: jsfiddle_1.default,
    slideshare: slideshare_1.default,
    googleslide: google_slide_1.default
};
function parse(state) {
    if (state.src.charCodeAt(state.pos) !== 123)
        return false;
    var match = regexp.exec(state.src.slice(state.pos));
    if (!match)
        return false;
    var token = state.push('at-embed', 'embed', state.level);
    token.meta = {
        site: match[1]
    };
    token.content = match[2];
    state.pos += match[0].length;
    return true;
}
var render = function (renderers, options) { return function (tokens, idx) {
    var token = tokens[idx];
    var site = token.meta.site;
    var render = renderers[site];
    return typeof render === 'function'
        ? render(token.content, options)
        : token.content;
}; };
exports.createPlugin = function (options) { return function (md) {
    md.inline.ruler.push('at-embed', parse);
    md.renderer.rules['at-embed'] = render(sites, options);
}; };
