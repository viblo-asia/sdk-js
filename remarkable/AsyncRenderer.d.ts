import { Rule, Token } from '../types/markdown';
export declare class AsyncRenderer {
    rules: {
        [key: string]: Rule;
    };
    getBreak: any;
    constructor(rules?: {
        [key: string]: Rule;
    });
    private iterateInline(tokens, options, env);
    private iterateBlock(tokens, options, env);
    renderInline(tokens: Array<Token>, options: object, env: object): Promise<string>;
    render(tokens: Array<Token>, options: object, env: object): Promise<string>;
}
