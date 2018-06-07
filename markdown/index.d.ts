import Markdown = require('markdown-it');
export interface EmbedOptions {
    wrapperClass?: string;
    iframeClass?: string;
}
export interface Options {
    /** Base URL */
    baseURL?: string;
    /** Whether to render embedments or not */
    embed?: boolean | EmbedOptions;
    /** Should relative URLs be made to absolute */
    absoluteURL?: boolean;
}
export declare function createRenderer(options: Options): Markdown.MarkdownIt;
