import Markdown = require('markdown-it');
export interface Options {
    baseURL: string;
    embed?: boolean;
}
export declare function createRenderer(options?: Options): Markdown.MarkdownIt;
