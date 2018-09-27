import { EmbedOptions, EmbedProvider } from '../embed';
import { renderEmbed } from '../../utils';

const encodeURI = (uri: string): string => {
    return `https://player.vimeo.com/video/${encodeURIComponent(uri)}`;
};

export default class Vimeo implements EmbedProvider {
    parseEmbedURL(code: string): string {
        if (code.startsWith('https://')) {
            const regExp = /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
            const match = code.match(regExp);
            if (!match || match[5].length === 0) {
                return '';
            }

            return encodeURI(match[5]);
        }

        return encodeURI(code);
    }

    render(code: string, options: EmbedOptions): string {
        const embedURL = this.parseEmbedURL(code);

        if (!embedURL) return code;

        return renderEmbed({
            type: 'text/html',
            src: embedURL,
            frameborder: 0,
            webkitallowfullscreen: true,
            mozallowfullscreen: true,
            allowfullscreen: true
        }, options);
    }
}
