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
var katex = require('katex/dist/katex');
var isValidClosing = function (state, pos) {
    var max = state.posMax;
    var nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;
    // Should not be followed by a number
    return nextChar < 0x30 || nextChar > 0x39;
};
var math_inline = function (state, silent) {
    if (state.src[state.pos] !== '$') {
        return false;
    }
    var start = state.pos + 1;
    var match = start;
    var pos = match - 1;
    // Look for possible valid closing, ignore escaped ones e.g \$
    while ((match = state.src.indexOf('$', match)) !== -1) {
        // Found potential $, keep looking back to see how many back slashes are there
        pos = match - 1;
        while (state.src[pos] === '\\') {
            pos -= 1;
        }
        // Is closing $ if all back slashes are properly escaped i.e: even amount of them
        if (((match - pos) % 2) === 1) {
            break;
        }
        match += 1;
    }
    // No closing delimter found.  Consume $ and continue.
    if (match === -1) {
        if (!silent) {
            state.pending += '$';
        }
        state.pos = start;
        return true;
    }
    // Check if we have empty content, ie: $$. Skip
    if (match - start === 0) {
        if (!silent) {
            state.pending += '$$';
        }
        state.pos = start + 1;
        return true;
    }
    // Check if closing $ is valid
    if (!isValidClosing(state, state.pos)) {
        if (!silent) {
            state.pending += '$';
        }
        state.pos = start;
        return true;
    }
    if (!silent) {
        state.push({
            type: 'math_inline',
            tag: 'math',
            markup: '$',
            content: state.src.slice(start, match)
        });
    }
    state.pos = match + 1;
    return true;
};
var math_block = function (state, start, end, silent) {
    var firstLine;
    var firstLineOffsets = getLineOffsets(start, state);
    var firstLineStart = firstLineOffsets.start;
    var firstLineEnd = firstLineOffsets.end;
    // Too short
    if (firstLineStart + 2 > firstLineEnd) {
        return false;
    }
    // Not a valid Opening
    if (state.src.slice(firstLineStart, firstLineStart + 2) !== '$$') {
        return false;
    }
    firstLine = state.src.slice(firstLineStart + 2, firstLineEnd);
    // Don't check for closing if in silent mode
    if (silent) {
        return true;
    }
    var lastLine;
    var current = start;
    // Single line expression
    if (firstLine.trim().slice(-2) === '$$') {
        firstLine = firstLine.trim().slice(0, -2);
    }
    else {
        var lastLineIndex = findBlockLastLine(start, end, state);
        if (lastLineIndex) {
            current = lastLineIndex;
            var lastLineOffsets = getLineOffsets(current, state);
            var first = lastLineOffsets.start;
            var last = lastLineOffsets.end;
            lastLine = state.src.slice(first, last).trim().slice(0, -2);
        }
    }
    state.line = current + 1;
    state.tokens.push({
        type: 'math_block',
        tag: 'math',
        block: true,
        markup: '$$',
        content: (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
            state.getLines(start + 1, current, state.tShift[start], true) +
            (lastLine && lastLine.trim() ? lastLine : ''),
        map: [start, state.line],
    });
    return true;
};
var getLineOffsets = function (line, state) { return ({
    start: state.bMarks[line] + state.tShift[line],
    end: state.eMarks[line]
}); };
var findBlockLastLine = function (start, end, state) {
    var current = start;
    while (current < end) {
        current++;
        var lineOffsets = getLineOffsets(current, state);
        var first = lineOffsets.start;
        var last = lineOffsets.end;
        if (first < last && state.tShift[current] < state.blkIndent) {
            // non-empty line with negative indent should stop the list:
            break;
        }
        if (state.src.slice(first, last).trim().slice(-2) === '$$') {
            return current;
        }
    }
    return null;
};
var render = function (content, options) {
    try {
        return options.displayMode
            ? '<p>' + katex.renderToString(content, options) + '</p>'
            : katex.renderToString(content, options);
    }
    catch (error) {
        if (options.throwOnError) {
            console.log(error);
        }
        return content;
    }
};
exports.KatexPlugin = function (md, options) {
    if (options === void 0) { options = {}; }
    md.inline.ruler.after('escape', 'math_inline', math_inline);
    md.block.ruler.after('blockquote', 'math_block', math_block, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });
    var inlineRule = function (tokens, idx) { return render(tokens[idx].content, __assign({}, options, { displayMode: false })); };
    var blockRule = function (tokens, idx) { return render(tokens[idx].content, __assign({}, options, { displayMode: true })); };
    md.renderer.rules.math_inline = inlineRule;
    md.renderer.rules.math_block = blockRule;
};
