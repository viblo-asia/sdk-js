import twemoji = require('twemoji');
import Markdown = require('markdown-it');
import emoji = require('markdown-it-emoji');
import sanitize = require('markdown-it-sanitizer');

import katex from './plugins/katex';
import highlight from './plugins/highlight';
import { alterToken } from './utils';
import { createPlugin as createEmbedPlugin } from './plugins/embed';
import { createDefinition as createMentionPlugin } from './plugins/linkify-mention';

import codepen from './plugins/embeds/codepen';
import jsfiddle from './plugins/embeds/jsfiddle';
import gist from './plugins/embeds/gist';
import googleslide from './plugins/embeds/google-slide';
import createSlideshareRenderer from './plugins/embeds/slideshare';
import vimeo from './plugins/embeds/vimeo';
import youtube from './plugins/embeds/youtube';

export interface Options {
    /** Base URL */
    baseURL: string;
    /** Whether to render embedments or not */
    embed?: boolean;
    /** Should relative URLs be made to absolute */
    absoluteURL?: boolean;
}

const defaultOptions: Options = {
    baseURL: 'https://viblo.asia',
    embed: true,
    absoluteURL: true
};

export function createRenderer(options: Options) {
    const mergedOptions = Object.assign({}, defaultOptions, options);

    const slideshare = createSlideshareRenderer({
        baseURL: mergedOptions.baseURL
    });

    const embedPlugin = createEmbedPlugin({
        codepen,
        jsfiddle,
        gist,
        googleslide,
        vimeo,
        youtube,
        slideshare
    });

    const md = Markdown({
        html: true,
        linkify: true
    });

    md.use(emoji);
    md.use(highlight);
    md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content);

    md.use(katex, { throwOnError: false });

    /* tslint:disable:align */
    alterToken('link_open', (token) => {
        token.attrPush(['target', '_blank']);

        if (mergedOptions.absoluteURL) {
            const href = token.attrGet('href');
            if (href && href.startsWith('/')) {
                token.attrSet('href', `${mergedOptions.baseURL}${href}`);
            }
        }

        return token;
    }, md);
    /* tslint:enable:align */

    md.linkify.add('@', createMentionPlugin(`${mergedOptions.baseURL}/u`));

    if (mergedOptions.embed !== false) {
        md.use(embedPlugin);
    }

    md.use(sanitize);

    return md;
}
