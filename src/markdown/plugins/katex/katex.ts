import katex = require('katex');
import { MarkdownIt } from 'markdown-it';
import { escape } from '../../utils';
import inlineRule from './math_inline';
import blockRule from './math_block';

function renderErrorMessage(message: string) {
    return `<p class="math-block--error">${message}</p>`;
}

function render(content: string, options: any) {
    try {
        if (content.length <= options.maxCharacter) {
            return options.displayMode
                ? `<p>${katex.renderToString(content, options)}</p>`
                : katex.renderToString(content, options);
        }

        return renderErrorMessage(
            `For performance reasons, math blocks are limited to ${options.maxCharacter} characters.`
            + ' Try splitting up this block, or include an image instead.'
        );
    } catch (error) {
        return escape(content);
    }
}

export default function (md: MarkdownIt, options: object) {
    md.inline.ruler.push('math_inline', inlineRule);
    md.block.ruler.after('blockquote', 'math_block', blockRule, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });

    md.renderer.rules.math_inline = (tokens, idx) => render(tokens[idx].content, { ...options, displayMode: false });
    md.renderer.rules.math_block = (tokens, idx) => render(tokens[idx].content, { ...options, displayMode: true });
}
