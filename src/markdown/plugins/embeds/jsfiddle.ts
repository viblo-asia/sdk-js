import { EmbedOptions } from '../embed';
import { renderEmbed } from '../../utils';

export default (code: string, options: EmbedOptions): string => {
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

    return renderEmbed({
        src: embedUrl,
        height: 400
    }, options);
};
