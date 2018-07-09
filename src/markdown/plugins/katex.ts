// A modified version of https://github.com/waylonflinn/markdown-it-katex

import katex = require('katex/dist/katex');
import { MarkdownIt, StateInline, StateBlock } from 'markdown-it';
import { escape } from '../utils';

function isValidClosing(state: StateInline, pos: number) {
    const max = state.posMax;
    const nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1;

    // Should not be followed by a number
    return nextChar < 0x30 || nextChar > 0x39;
}

function math_inline(state: StateInline, silent: boolean) {
    if (state.src[state.pos] !== '$') {
        return false;
    }

    const start = state.pos + 1;

    let match = start;
    let pos = match - 1;
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
        const token = state.push('math_inline', 'math', 0);
        token.markup = '$';
        token.content = state.src.slice(start, match);
    }

    state.pos = match + 1;

    return true;
}

function math_block(state: StateBlock, start: number, end: number, silent: boolean) {
    let firstLine;

    const firstLineOffsets = getLineOffsets(start, state);
    const firstLineStart = firstLineOffsets.start;
    const firstLineEnd = firstLineOffsets.end;

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

    let lastLine;
    let current = start;
    // Single line expression
    if (firstLine.trim().slice(-2) === '$$') {
        firstLine = firstLine.trim().slice(0, -2);
    } else {
        const lastLineIndex = findBlockLastLine(start, end, state);

        if (lastLineIndex) {
            current = lastLineIndex;

            const lastLineOffsets = getLineOffsets(current, state);
            const first = lastLineOffsets.start;
            const last = lastLineOffsets.end;

            lastLine = state.src.slice(first, last).trim().slice(0, -2);
        }
    }

    state.line = current + 1;

    const token = state.push('math_block', 'math', 0);
    token.block = true;
    token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
        state.getLines(start + 1, current, state.tShift[start], true) +
        (lastLine && lastLine.trim() ? lastLine : '');
    token.map = [start, state.line];
    token.markup = '$$';

    return true;
}

const getLineOffsets = (line, state) => ({
    start: state.bMarks[line] + state.tShift[line],
    end: state.eMarks[line]
});

function findBlockLastLine(start: number, end: number, state: StateBlock) {
    let current = start;

    while (current < end) {
        current += 1;

        const lineOffsets = getLineOffsets(current, state);
        const first = lineOffsets.start;
        const last = lineOffsets.end;

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

function render(content: string, options: any) {
    try {
        return options.displayMode
            ? '<p>' + katex.renderToString(content, options) + '</p>'
            : katex.renderToString(content, options);
    } catch (error) {
        return escape(content);
    }
}

export default function (md: MarkdownIt, options: object) {
    md.inline.ruler.after('escape', 'math_inline', math_inline);
    md.block.ruler.after('blockquote', 'math_block', math_block, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });

    md.renderer.rules.math_inline = (tokens, idx) => render(tokens[idx].content, { ...options, displayMode: false });
    md.renderer.rules.math_block = (tokens, idx) => render(tokens[idx].content, { ...options, displayMode: true });
}
