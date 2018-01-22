"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var regexp = /{@(\w+)\s*:\s*([\S]+?)}/;
var parse = function (renderers) { return function (state) {
    if (state.src.charCodeAt(state.pos) !== 123)
        return false;
    var match = regexp.exec(state.src.slice(state.pos));
    if (!match)
        return false;
    var token = state.push('at-embed', 'embed', state.level);
    token.meta = {
        renderer: match[1]
    };
    token.content = match[2];
    state.pos += match[0].length;
    return true;
}; };
var render = function (renderers) { return function (tokens, idx) {
    var token = tokens[idx];
    var renderer = token.meta.renderer;
    return renderers.hasOwnProperty(renderer)
        ? renderers[renderer](token.content)
        : token.content;
}; };
exports.createPlugin = function (renderers) { return function (md) {
    md.inline.ruler.push('at-embed', parse(renderers));
    md.renderer.rules['at-embed'] = render(renderers);
}; };
