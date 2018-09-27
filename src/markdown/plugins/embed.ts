import { MarkdownIt, StateInline, Token } from 'markdown-it';
import providers from './embeds';

const regexp = /{@(embed|gist|vimeo|codepen|youtube|jsfiddle|slideshare|googleslide)\s*:\s*([\S]+?)}/;

const detectEmbedProvider = (embedURL: string) => {
    for (const name in providers) {
        if ((new providers[name]).parseEmbedURL(embedURL)) {
            return name;
        }
    }
};

function parse(state: StateInline) {
    if (state.src.charCodeAt(state.pos) !== 123) return false;

    const match = regexp.exec(state.src.slice(state.pos));

    if (!match) return false;

    const token = state.push('at-embed', 'embed', state.level);
    const embedURL = match[2];
    const embedProvider = match[1] === 'embed' ? detectEmbedProvider(embedURL) : match[1];

    token.meta = { embedProvider };
    token.content = embedURL;

    state.pos += match[0].length;

    return true;
}

const render = (renderers: Object, options: EmbedOptions) => function (tokens: Token[], idx: number) {
    const token = tokens[idx];
    const name = token.meta.embedProvider;
    const provider = new renderers[name];

    return provider ? provider.render(token.content, options) : token.content;
};

export const createPlugin = (options: EmbedOptions) => function (md: MarkdownIt) {
    md.inline.ruler.push('at-embed', parse);
    md.renderer.rules['at-embed'] = render(providers, options);
};

export interface EmbedOptions {
    baseURL?: string;
    wrapperClass?: string;
    iframeClass?: string;
}

export interface EmbedProvider {
    parseEmbedURL(code: string): string;
    render(code: string, options: EmbedOptions): string;
}
