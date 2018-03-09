"use strict";
// A modified version of https://github.com/waylonflinn/markdown-it-katex
Object.defineProperty(exports, "__esModule", { value: true });
var katex = require("katex/dist/katex");
function isValidClosing(state, pos) {
    var max = state.posMax;
    var nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;
    // Should not be followed by a number
    return nextChar < 0x30 || nextChar > 0x39;
}
function math_inline(state, silent) {
    if (state.src[state.pos] !== '$') {
        return false;
    }
    var start = state.pos + 1;
    var match = start;
    var pos = match - 1;
    // Look for possible valid closing, ignore escaped ones e.g \$
    while ((state.src.indexOf('$', match)) !== -1) {
        match = state.src.indexOf('$', match);
        // Found potential $, keep looking back to see how many back slashes are there
        pos = match - 1;
        while (state.src[pos] === '\\') {
            pos -= 1;
        }
        // Is closing $ if all back slashes are properly escaped i.e: an even amount of back slashes
        if (((match - pos) % 2) === 1) {
            break;
        }
        // Next
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
        var token = state.push('math_inline', 'math', 0);
        token.markup = '$';
        token.content = state.src.slice(start, match);
    }
    state.pos = match + 1;
    return true;
}
function math_block(state, start, end, silent) {
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
    var token = state.push('math_block', 'math', 0);
    token.block = true;
    token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
        state.getLines(start + 1, current, state.tShift[start], true) +
        (lastLine && lastLine.trim() ? lastLine : '');
    token.map = [start, state.line];
    token.markup = '$$';
    return true;
}
var getLineOffsets = function (line, state) { return ({
    start: state.bMarks[line] + state.tShift[line],
    end: state.eMarks[line]
}); };
function findBlockLastLine(start, end, state) {
    var current = start;
    while (current < end) {
        current += 1;
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
}
function render(content, options) {
    try {
        return options.displayMode
            ? '<p>' + katex.renderToString(content, options) + '</p>'
            : katex.renderToString(content, options);
    }
    catch (error) {
        if (options.throwOnError) {
            console.error(error);
        }
        return content;
    }
}
function default_1(md) {
    md.inline.ruler.after('escape', 'math_inline', math_inline);
    md.block.ruler.after('blockquote', 'math_block', math_block, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });
    md.renderer.rules.math_inline = function (tokens, idx) { return render(tokens[idx].content, { displayMode: false }); };
    md.renderer.rules.math_block = function (tokens, idx) { return render(tokens[idx].content, { displayMode: true }); };
}
exports.default = default_1;
