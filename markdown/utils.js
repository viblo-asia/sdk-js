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
