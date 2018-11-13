import katex = require('katex');
import { MarkdownIt } from 'markdown-it';
import { escape } from '../../utils';
import inlineRule from './math_inline';
import blockRule from './math_block';

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
    md.inline.ruler.push('math_inline', inlineRule);
    md.block.ruler.after('blockquote', 'math_block', blockRule, {
        alt: ['paragraph', 'reference', 'blockquote', 'list']
    });

    md.renderer.rules.math_inline = (tokens, idx) => render(tokens[idx].content, { ...options, displayMode: false });
    md.renderer.rules.math_block = (tokens, idx) => render(tokens[idx].content, { ...options, displayMode: true });
}
