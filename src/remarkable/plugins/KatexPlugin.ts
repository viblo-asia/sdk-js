import { Plugin, Rule, State } from '../../types/markdown'
import * as katex from 'katex'

const isValidClosing = (state: State, pos: number) => {
    const max = state.posMax
    const nextChar = pos + 1 <= max ? state.src.charCodeAt(pos + 1) : -1

    // Should not be followed by a number
    return nextChar < 0x30 || nextChar > 0x39
}

const math_inline = (state: State, silent: boolean) => {
    if (state.src[state.pos] !== '$') {
        return false
    }

    const start = state.pos + 1

    let match = start
    let pos = match - 1
    // Look for possible valid closing, ignore escaped ones e.g \$
    while ((match = state.src.indexOf('$', match)) !== -1) {
        // Found potential $, keep looking back to see how many back slashes are there
        pos = match - 1
        while (state.src[pos] === '\\') {
            pos -= 1
        }

        // Is closing $ if all back slashes are properly escaped i.e: even amount of them
        if (((match - pos) % 2) === 1) {
            break
        }

        match += 1
    }

    // No closing delimter found.  Consume $ and continue.
    if (match === -1) {
        if (!silent) {
            state.pending += '$'
        }
        state.pos = start

        return true
    }

    // Check if we have empty content, ie: $$. Skip
    if (match - start === 0) {
        if (!silent) {
            state.pending += '$$'
        }
        state.pos = start + 1

        return true
    }

    // Check if closing $ is valid
    if (!isValidClosing(state, state.pos)) {
        if (!silent) {
            state.pending += '$'
        }
        state.pos = start

        return true
    }

    if (!silent) {
        state.push({
            type: 'math_inline',
            tag: 'math',
            markup: '$',
            content: state.src.slice(start, match)
        })
    }

    state.pos = match + 1

    return true
}

const math_block = (state: State, start: number, end: number, silent: boolean) => {
    let firstLine

    const firstLineOffsets = getLineOffsets(start, state)
    const firstLineStart = firstLineOffsets.start
    const firstLineEnd = firstLineOffsets.end

    // Too short
    if (firstLineStart + 2 > firstLineEnd) {
        return false
    }

    // Not a valid Opening
    if (state.src.slice(firstLineStart, firstLineStart + 2) !== '$$') {
        return false
    }

    firstLine = state.src.slice(firstLineStart + 2, firstLineEnd)

    // Don't check for closing if in silent mode
    if (silent) {
        return true
    }

    let lastLine
    let current = start
    // Single line expression
    if (firstLine.trim().slice(-2) === '$$') {
        firstLine = firstLine.trim().slice(0, -2)
    } else {
        const lastLineIndex = findBlockLastLine(start, end, state)

        if (lastLineIndex) {
            current = lastLineIndex

            const lastLineOffsets = getLineOffsets(current, state)
            const first = lastLineOffsets.start
            const last = lastLineOffsets.end

            lastLine = state.src.slice(first, last).trim().slice(0, -2)
        }
    }

    state.line = current + 1

    state.tokens.push({
        type: 'math_block',
        tag: 'math',
        block: true,
        markup: '$$',
        content: (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
            state.getLines(start + 1, current, state.tShift[start], true) +
            (lastLine && lastLine.trim() ? lastLine : ''),
        map: [ start, state.line ],
    })

    return true
}

const getLineOffsets = (line: number, state: State) => ({
    start: state.bMarks[line] + state.tShift[line],
    end: state.eMarks[line]
})

const findBlockLastLine = (start: number, end: number, state: State) => {
    let current = start

    while (current < end) {
        current++

        const lineOffsets = getLineOffsets(current, state)
        const first = lineOffsets.start
        const last = lineOffsets.end

        if (first < last && state.tShift[current] < state.blkIndent) {
            // non-empty line with negative indent should stop the list:
            break
        }

        if (state.src.slice(first, last).trim().slice(-2) === '$$') {
            return current
        }
    }

    return null
}

const render = (content: string, options: { [key:string]: any }) => {
    try {
        return options.displayMode
            ? '<p>' + katex.renderToString(content, options) + '</p>'
            : katex.renderToString(content, options)
    } catch (error) {
        if (options.throwOnError) {
            console.log(error)
        }

        return content
    }
}

export const KatexPlugin: Plugin = (md, options = {}) => {
    md.inline.ruler.after('escape', 'math_inline', math_inline)
    md.block.ruler.after('blockquote', 'math_block', math_block, {
        alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
    })

    const inlineRule: Rule = (tokens, idx) => render(tokens[idx].content, {...options, displayMode: false})
    const blockRule: Rule = (tokens, idx) => render(tokens[idx].content, {...options, displayMode: true})

    md.renderer.rules.math_inline = inlineRule
    md.renderer.rules.math_block = blockRule
}
