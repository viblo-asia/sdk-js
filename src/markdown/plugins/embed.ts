import { MarkdownIt, StateInline, Token } from 'markdown-it';

const regexp = /{@(\w+)\s*:\s*([\S]+?)}/;

const parse = (renderers: Object) => function (state: StateInline) {
    if (state.src.charCodeAt(state.pos) !== 123) return false;

    const match = regexp.exec(state.src.slice(state.pos));

    if (!match) return false;

    const token = state.push('at-embed', 'embed', state.level);
    token.meta = {
        renderer: match[1]
    };

    token.content = match[2];

    state.pos += match[0].length;

    return true;
};

const render = (renderers: Object) => function (tokens: Array<Token>, idx: number) {
    const token = tokens[idx];
    const renderer = token.meta.renderer;

    return renderers.hasOwnProperty(renderer)
        ? renderers[renderer](token.content)
        : token.content;
};

export const createPlugin = (renderers: Object) => function (md: MarkdownIt) {
    md.inline.ruler.push('at-embed', parse(renderers));
    md.renderer.rules['at-embed'] = render(renderers);
};
