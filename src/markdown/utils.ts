import { EmbedOptions } from './plugins/embed';
import { MarkdownIt, Token, Renderer } from 'markdown-it';

type AlterTokenFunction = (token: Token) => Token;

export function alterToken(rule: string, alter: AlterTokenFunction, md: MarkdownIt): MarkdownIt {
    const renderer = md.renderer.rules[rule]
        || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    md.renderer.rules[rule] = (tokens: Token[], idx: number, options, env, self: Renderer) => {
        const token = tokens[idx];
        const alteredToken = alter(token);
        tokens[idx] = alteredToken;

        return renderer(tokens, idx, options, env, self);
    };

    return md;
}

/**
 * https://github.com/lodash/lodash/blob/master/escape.js
 */
const htmlEscapes = {
    '&': '&amp',
    '<': '&lt',
    '>': '&gt',
    '"': '&quot',
    '\'': '&#39'
};

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

export function escape(string) {
    return (string && reHasUnescapedHtml.test(string))
      ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr])
      : string;
}

export function renderEmbed(attrs: object, options: EmbedOptions) {
    const iframeAttrs = Object.keys(attrs)
        .map((key) => {
            const value = attrs[key];

            return value === true ? key : `${key}="${attrs[key]}"`;
        })
        .join(' ');

    const iframeClassAttr = options.iframeClass ? `class="${options.iframeClass}"` : '';
    const iframe = `<iframe ${iframeClassAttr} ${iframeAttrs}></iframe>`;

    const wrapperClassAttr = options.wrapperClass ? `class="${options.wrapperClass}"` : '';

    return `<div ${wrapperClassAttr}>${iframe}</div>`;
}
