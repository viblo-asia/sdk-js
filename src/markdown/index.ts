import twemoji = require('twemoji');
import Markdown = require('markdown-it');
import emoji = require('markdown-it-emoji');
import sanitize = require('markdown-it-sanitizer');

import katex from './plugins/katex';
import highlight from './plugins/highlight';
import { createDefinition as createMentionPlugin } from './plugins/linkify-mention';
import { createPlugin as createEmbedPlugin } from './plugins/embed';

import codepen from './plugins/embeds/codepen';
import jsfiddle from './plugins/embeds/jsfiddle';
import gist from './plugins/embeds/gist';
import googleslide from './plugins/embeds/google-slide';
import slideshare from './plugins/embeds/slideshare';
import vimeo from './plugins/embeds/vimeo';
import youtube from './plugins/embeds/youtube';

export interface Options {
    baseURL: string;
    embed?: boolean;
}

const defaultOptions: Options = {
    baseURL: 'https://viblo.asia',
    embed: true
};

const embedPlugin = createEmbedPlugin({
    codepen,
    jsfiddle,
    gist,
    googleslide,
    slideshare,
    vimeo,
    youtube
});

export function createRenderer(options: Options = defaultOptions) {
    const md = Markdown({
        highlight,
        html: true,
        linkify: true
    });

    md.use(emoji);
    md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content);

    md.use(katex, { throwOnError: false });

    const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        tokens[idx].attrPush(['target', '_blank']);

        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);
    };

    md.linkify.add('@', createMentionPlugin(`${options.baseURL}/u`));

    if (options.embed !== false) {
        md.use(embedPlugin);
    }

    md.use(sanitize);

    return md;
}
