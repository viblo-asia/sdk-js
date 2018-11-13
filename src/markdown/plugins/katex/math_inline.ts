import { StateInline } from 'markdown-it';

function skip(state: StateInline, openingLength: number) {
    state.pending += '$'.repeat(openingLength);
    state.pos += openingLength;

    return true;
}

function findClosing(state: StateInline, start: number): number {
    const match = state.src.slice(start).match(/(^|[^\\])(\\\\)*\$/);

    if (match && match.index !== undefined) {
        const found = start + match.index + match[0].length - 1;

        const closing = state.scanDelims(found, false);

        if (closing.can_close) {
            return found;
        }
    }

    return -1;
}

export default function (state: StateInline, silent: boolean) {
    if (silent || state.src[state.pos] !== '$') {
        return false;
    }

    const opening = state.scanDelims(state.pos, false);

    if (opening.length > 1 || !opening.can_open) {
        return skip(state, opening.length);
    }

    const start = state.pos + opening.length;
    const closingIndex = findClosing(state, start);

    if (closingIndex === -1) {
        return skip(state, opening.length);
    }

    const content = state.src.slice(start, closingIndex);

    if (!silent) {
        const token = state.push('math_inline', 'math', 0);
        token.markup = '$';
        token.content = state.src.slice(state.pos + opening.length, closingIndex);
    }

    state.pos += opening.length + content.length + 1;

    return true;
}
