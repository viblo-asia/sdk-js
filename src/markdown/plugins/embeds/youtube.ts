import { EmbedOptions, EmbedProvider } from '../embed';
import { renderEmbed } from '../../utils';

export default class Youtube implements EmbedProvider {
    parseEmbedURL(code: string): string {
        if (code.startsWith('https://')) {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = code.match(regExp);
            if (!match || match[7].length !== 11) {
                return '';
            }

            return encodeURIComponent(match[7]);
        }

        return code;
    }

    render(code: string, options: EmbedOptions): string {
        const embedURL = this.parseEmbedURL(code);

        if (!embedURL) return code;

        return renderEmbed({
            type: 'text/html',
            src: `https://www.youtube.com/embed/${embedURL}`,
            frameborder: 0,
            webkitallowfullscreen: true,
            mozallowfullscreen: true,
            allowfullscreen: true
        }, options);
    }
}
