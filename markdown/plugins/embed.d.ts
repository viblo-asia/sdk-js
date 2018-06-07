import { MarkdownIt } from 'markdown-it';
export declare const createPlugin: (options: EmbedOptions) => (md: MarkdownIt) => void;
export interface EmbedOptions {
    baseURL?: string;
    wrapperClass?: string;
    iframeClass?: string;
}
