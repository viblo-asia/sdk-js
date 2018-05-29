import Markdown = require('markdown-it');
export interface Options {
    /** Base URL */
    baseURL: string;
    /** Whether to render embedments or not */
    embed?: boolean;
    /** Should relative URLs be made to absolute */
    absoluteURL?: boolean;
}
export declare function createRenderer(options: Options): Markdown.MarkdownIt;
