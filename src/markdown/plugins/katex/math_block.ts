import { StateBlock } from 'markdown-it';

export default function (state: StateBlock, start: number, end: number, silent: boolean) {
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
    token.content = (firstLine && firstLine.trim() ? `${firstLine}\n` : '') +
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
