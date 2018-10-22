import twemoji from 'twemoji/2/esm';
import Markdown = require('markdown-it');
import emoji = require('markdown-it-emoji');
import sanitize = require('markdown-it-sanitizer');

import katex from './plugins/katex';
import highlight from './plugins/highlight';
import { alterToken } from './utils';
import { createPlugin as createEmbedPlugin } from './plugins/embed';
import { createDefinition as createMentionPlugin } from './plugins/linkify-mention';

export interface EmbedOptions {
    wrapperClass?: string;
    iframeClass?: string;
}

export interface Options {
    /** Base URL */
    baseURL?: string;
    /** Whether to render embedments or not */
    embed?: boolean | EmbedOptions;
    /** Should relative URLs be made to absolute */
    absoluteURL?: boolean;
}

const defaultOptions: Options = {
    baseURL: 'https://viblo.asia',
    embed: true,
    absoluteURL: true
};

export function createRenderer(options: Options) {
    const _options = Object.assign({}, defaultOptions, options);

    const md = Markdown({
        html: true,
        linkify: true
    });

    md.use(emoji);
    md.use(highlight);
    md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content);

    md.use(katex, {
        throwOnError: true,
        strict: true
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

    md.use(sanitize);

    return md;
}
