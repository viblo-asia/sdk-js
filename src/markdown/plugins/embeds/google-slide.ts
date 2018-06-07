import { EmbedOptions } from '../embed';
import { renderEmbed } from '../../utils';

const encodeURI = (uri: string): string => {
    return `https://docs.google.com/presentation/d/${encodeURIComponent(uri)}/embed`
        + `?start=false&loop=false&delayms=3000`;
};

const parseGoogleSlideURL = (code: string): string => {
    if (code.startsWith('https://docs.google.com/presentation/d/')) {
        const match = code.match(/[-\w]{25,}/);
        return !match ? '' : encodeURI(match[0]);
    }

    return encodeURI(code);
};

export default (code: string, options: EmbedOptions): string => {
    const embedURL = parseGoogleSlideURL(code);
    if (!embedURL) {
        return '';
    }

    return renderEmbed({
        src: embedURL,
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
};
