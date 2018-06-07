import { MarkdownIt, StateInline, Token } from 'markdown-it';

import gist from './embeds/gist';
import vimeo from './embeds/vimeo';
import codepen from './embeds/codepen';
import youtube from './embeds/youtube';
import jsfiddle from './embeds/jsfiddle';
import slideshare from './embeds/slideshare';
import googleslide from './embeds/google-slide';

const regexp = /{@(\w+)\s*:\s*([\S]+?)}/;

const sites = {
    gist,
    vimeo,
    codepen,
    youtube,
    jsfiddle,
    slideshare,
    googleslide
};

function parse(state: StateInline) {
    if (state.src.charCodeAt(state.pos) !== 123) return false;

    const match = regexp.exec(state.src.slice(state.pos));

    if (!match) return false;

    const token = state.push('at-embed', 'embed', state.level);
    token.meta = {
        site: match[1]
    };

    token.content = match[2];

    state.pos += match[0].length;

    return true;
}

const render = (renderers: Object, options: EmbedOptions) => function (tokens: Token[], idx: number) {
    const token = tokens[idx];
    const site = token.meta.site;

    const render = renderers[site];

    return typeof render === 'function'
        ? render(token.content, options)
        : token.content;
};

export const createPlugin = (options: EmbedOptions) => function (md: MarkdownIt) {
    md.inline.ruler.push('at-embed', parse);
    md.renderer.rules['at-embed'] = render(sites, options);
};

export interface EmbedOptions {
    baseURL?: string;
    wrapperClass?: string;
    iframeClass?: string;
}
