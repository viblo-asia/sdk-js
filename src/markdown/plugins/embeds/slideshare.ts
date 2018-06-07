import { EmbedOptions } from '../embed';
import { renderEmbed } from '../../utils';

const parseSlideShareURL = (code: string, baseURL: string): string => {
    const isSlideShareID = /^([0-9])+$/.test(code);
    const isSlideShareURL = /^(?:(?:http|https):\/\/)?(?:www\.)?(slideshare\.net\/.+)$/.test(code);
    const matchesEmbed = code.match(/^(?:(?:http|https):\/\/)?(?:www\.)?(slideshare\.net\/slideshow\/embed_code\/.+)$/);

    if (isSlideShareID) {
        return `https://slideshare.net/slideshow/embed_code/${code}`;
    }

    if (!isSlideShareURL) {
        return '';
    }

    if (matchesEmbed) {
        return `https://${matchesEmbed[1]}`;
    }

    return `${baseURL}/embed/slideshare/?url=${code}`;
};

export default (str: string, options: EmbedOptions): string => {
    const embedURL = parseSlideShareURL(str, options.baseURL || '');

    if (!embedURL) return str;

    return renderEmbed({
        type: 'text/html',
        src: embedURL,
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
};
