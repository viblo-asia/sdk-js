"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function alterToken(rule, alter, md) {
    var renderer = md.renderer.rules[rule]
        || (function (tokens, idx, options, env, self) { return self.renderToken(tokens, idx, options); });
    md.renderer.rules[rule] = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var alteredToken = alter(token);
        tokens[idx] = alteredToken;
        return renderer(tokens, idx, options, env, self);
    };
    return md;
}
exports.alterToken = alterToken;
function renderEmbed(attrs, options) {
    var iframeAttrs = Object.keys(attrs)
        .map(function (key) {
        var value = attrs[key];
        return value === true ? key : key + "=\"" + attrs[key] + "\"";
    })
        .join(' ');
    var iframeClassAttr = options.iframeClass ? "class=\"" + options.iframeClass + "\"" : '';
    var iframe = "<iframe " + iframeClassAttr + " " + iframeAttrs + "></iframe>";
    var wrapperClassAttr = options.wrapperClass ? "class=\"" + options.wrapperClass + "\"" : '';
    return "<div " + wrapperClassAttr + ">" + iframe + "</div>";
}
exports.renderEmbed = renderEmbed;
