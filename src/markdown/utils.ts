import { MarkdownIt, Token, Renderer } from 'markdown-it';

export type AlterTokenFunction = (token: Token) => Token;

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
