import { EmbedOptions, EmbedProvider } from '../embed';
import { renderEmbed } from '../../utils';

export default class JsFiddle implements EmbedProvider {
    parseEmbedURL(code: string): string {
        let embedUrl = code.replace(/^\/+|\/+$/gm, '')
            .replace(/(^http\:\/\/jsfiddle.net\/)|(^jsfiddle.net\/)/, 'https://jsfiddle.net/')
            .replace('/embed', '/embedded');

        if (!embedUrl.startsWith('https://jsfiddle.net/')) {
            embedUrl = `https://jsfiddle.net/${embedUrl}`;
        }

        // Support jsFiddle Url:
        if (/^https:\/\/jsfiddle\.net(?:\/[^\s\/]+){2}$/.test(embedUrl)) {
            embedUrl = `${embedUrl}/embedded`;
        }

        return embedUrl;
    }

    render(code: string, options: EmbedOptions): string {
        const embedURL = this.parseEmbedURL(code);

        return renderEmbed({
            src: embedURL,
            height: 400
        }, options);
    }
}
