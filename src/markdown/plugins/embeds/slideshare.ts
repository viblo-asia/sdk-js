import { EmbedOptions, EmbedProvider } from '../embed';
import { renderEmbed } from '../../utils';

export default class SlideShare implements EmbedProvider {
    parseEmbedURL(code: string): string {
        const isSlideShareID = /^([0-9])+$/.test(code);
        const isSlideShareURL = /^(?:(?:http|https):\/\/)?(?:www\.)?(slideshare\.net\/.+)$/.test(code);
        const matchEmbedURL = code.match(/^(?:(?:http|https):\/\/)?(?:www\.)?(slideshare\.net\/slideshow\/embed_code\/.+)$/); // tslint:disable-line

        if (isSlideShareID) {
            return `https://slideshare.net/slideshow/embed_code/${code}`;
        }

        if (!isSlideShareURL) {
            return '';
        }

        if (matchEmbedURL) {
            return `https://${matchEmbedURL[1]}`;
        }

        return `https://viblo.asia/embed/slideshare/?url=${code}`;
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
