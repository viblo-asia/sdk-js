import { MarkdownIt, StateInline, Token } from 'markdown-it';
import { renderEmbed } from '../utils';

const _escape = require('lodash.escape');

const regexp = /{@(embed|gist|vimeo|codepen|youtube|jsfiddle|slideshare|googleslide)\s*:\s*([\S]+?)}/;

function parse(state: StateInline) {
    if (state.src.charCodeAt(state.pos) !== 123) return false;

    const match = regexp.exec(state.src.slice(state.pos));

    if (!match) return false;

    const provider = match[1] === 'embed' ? null : match[1];
    const url = match[2];
    const token = state.push('at-embed', 'embed', state.level);

    token.meta = { provider };
    token.content = url;
    state.pos += match[0].length;

    return true;
}

const render = (options: EmbedOptions) => function (tokens: Token[], idx: number) {
    const token = tokens[idx];
    const baseURL = options.baseURL;
    const provider = token.meta.provider;
    const url = token.content;

    return renderEmbed({
        type: 'text/html',
        src: _escape(`${baseURL}/embed?url=${url}&provider=${provider}`),
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
};

export const createPlugin = (options: EmbedOptions) => function (md: MarkdownIt) {
    md.inline.ruler.push('at-embed', parse);
    md.renderer.rules['at-embed'] = render(options);
};

export interface EmbedOptions {
    baseURL?: string;
    wrapperClass?: string;
    iframeClass?: string;
}
