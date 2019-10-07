import twemoji from 'twemoji/2/esm';
import Markdown = require('markdown-it');
import emoji = require('markdown-it-emoji');
import sanitize = require('markdown-it-sanitizer');

import katex from './plugins/katex/katex';
import highlight from './plugins/highlight';
import { alterToken } from './utils';
import { createPlugin as createEmbedPlugin } from './plugins/embed';
import { createDefinition as createMentionPlugin } from './plugins/linkify-mention';

export interface EmbedOptions {
    wrapperClass?: string;
    iframeClass?: string;
}

interface KatexOptions {
    maxSize?: Number;
    maxExpand?: Number;
}

export interface Options {
    /** Base URL */
    baseURL?: string;
    /** Whether to render embedments or not */
    embed?: boolean | EmbedOptions;
    /** Should relative URLs be made to absolute */
    absoluteURL?: boolean;
    /** Katex Options */
    katex: KatexOptions;
}

const defaultOptions: Options = {
    baseURL: 'http://viblo.lc:8000',
    embed: true,
    absoluteURL: true,
    katex: {
        maxSize: 500,
        maxExpand: 100,
    },
};

export function createRenderer(options: Options) {
    const _options = Object.assign({}, defaultOptions, options);
    const _katexOptions = typeof _options.katex  === 'object' ? _options.katex : defaultOptions.katex;

    const md = Markdown({
        html: true,
        linkify: true
    });

    md.use(emoji);
    md.use(highlight);
    md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content);

    md.use(katex, {
        throwOnError: true,
        strict: true,
        ..._katexOptions,
    });

    alterToken('link_open', (token) => {
        token.attrPush(['target', '_blank']);

        if (_options.absoluteURL) {
            const href = token.attrGet('href');
            if (href && href.startsWith('/')) {
                token.attrSet('href', `${_options.baseURL}${href}`);
            }
        }

        return token;
    }, md);

    md.linkify.add('@', createMentionPlugin(`${_options.baseURL}/u`));

    if (_options.embed !== false) {
        const embedOptions = typeof _options.embed === 'object' ? _options.embed : {};

        const embedPlugin = createEmbedPlugin({
            ...embedOptions,
            baseURL: _options.baseURL
        });

        md.use(embedPlugin);
    }

    md.use(sanitize, { align: true });

    return md;
}
