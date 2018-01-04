"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render = function (tokens, index, options) {
    var token = tokens[index];
    return "<a href=\"" + options.mention.url + "/" + token.username + "\">@" + token.username + "</a>";
};
var checkPrecedingChar = function (src, pos) {
    if (pos === 0) {
        return true;
    }
    var char = src.charAt(pos - 1);
    return /[\s.,;:]/.test(char);
};
var token = function (username, state) { return ({
    type: 'mention',
    username: username,
    block: false,
    level: state.level
}); };
var reserved = function (word, reserved) { return reserved.length > 0 && reserved.includes(word); };
var parser = function (md, options) { return function (state) {
    if (state.src.charAt(state.pos) !== '@' || !checkPrecedingChar(state.src, state.pos)) {
        return false;
    }
    var text = state.src.slice(state.pos);
    var matches = /^@([\w_.\\-]{3,255})\b/.exec(text);
    if (!matches || reserved(matches[1], options.reserved)) {
        return false;
    }
    state.pos += matches[0].length;
    state.push(token(matches[1], state));
    return true;
}; };
exports.MentionsPlugin = function (md, options) {
    options.url = options.url || '';
    options.reserved = options.reserved || [];
    md.options.mention = options;
    md.inline.ruler.push('mention', parser(md, options), { alt: [] });
    md.renderer.rules.mention = render;
};
