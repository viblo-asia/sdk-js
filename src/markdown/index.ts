import twemoji from 'twemoji/2/esm';
import Markdown = require('markdown-it');
import emoji = require('markdown-it-emoji');
import * as sanitizeHtml from 'sanitize-html';
import sanitize = require('markdown-it-sanitizer');

import katex from './plugins/katex/katex';
import highlight from './plugins/highlight';
import clipboard from './plugins/clipboard';
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
    maxCharacter?: Number;
}

export interface ClipboardOptions {
    iconCopyClass?: string;
    successText?: string;
    successTextDelay: Number;
    buttonClass?: string;
    contentClass?: string;
    titleButton?: string;
    showMoreText?: string;
    showMoreClass?: string;
    showMoreIcon?: string;
    maxStringLengthShortcut: Number;
}

export interface Options {
    /** Base URL */
    baseURL?: string;
    /** Whether to add mention link or not */
    mention?: boolean;
    /** Whether to render embedments or not */
    embed?: boolean | EmbedOptions;
    /** Should relative URLs be made to absolute */
    absoluteURL?: boolean;
    /** Katex Options */
    katex: KatexOptions;
    /** Clipboard Options */
    clipboard: ClipboardOptions;
}

const defaultOptions: Options = {
    baseURL: 'https://viblo.asia',
    mention: true,
    embed: true,
    absoluteURL: true,
    katex: {
        maxSize: 500,
        maxExpand: 100,
        maxCharacter: 1000,
    },
    clipboard: {
        iconCopyClass: 'el-icon-document-copy',
        successText: 'Copied ✔️',
        successTextDelay: 2000,
        buttonClass: 'v-markdown-it-code-copy',
        contentClass: 'v-markdown-content-box',
        titleButton: 'Copy',
        showMoreText: 'Show more',
        showMoreClass: 'v-markdown-it-show-more',
        showMoreIcon: 'el-icon-bottom',
        maxStringLengthShortcut: 300
    }
};

const sanitizeOptions: sanitizeHtml.IOptions = {
    allowedTags: false,
    allowedAttributes: false
};

export function createRenderer(options: Options) {
    const _options = Object.assign({}, defaultOptions, options);
    const _katexOptions = typeof _options.katex === 'object' ? _options.katex : defaultOptions.katex;

    const _clipboardOptions = typeof _options.clipboard === 'object'
        ? Object.assign({}, defaultOptions.clipboard, _options.clipboard)
        : defaultOptions.clipboard;

    const md = Markdown({
        html: true,
        linkify: true
    });

    md.use(emoji);
    md.use(highlight);
    md.use(clipboard, _clipboardOptions);
    md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content);

    md.use(katex, {
        throwOnError: true,
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

    if (_options.mention !== false) {
        md.linkify.add('@', createMentionPlugin(`${_options.baseURL}/u`));
    }

    if (_options.embed !== false) {
        const embedOptions = typeof _options.embed === 'object' ? _options.embed : {};

        const embedPlugin = createEmbedPlugin({
            ...embedOptions,
            baseURL: _options.baseURL
        });

        md.use(embedPlugin);
    }

    md.use(sanitize, { align: true });

    const originalRender = md.render;
    md.render = (markdownContent) => {
        return sanitizeHtml(originalRender.call(md, markdownContent), sanitizeOptions);
    };

    return md;
}
