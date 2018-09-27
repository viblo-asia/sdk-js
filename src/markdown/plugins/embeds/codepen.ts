import { renderEmbed } from '../../utils';
import { EmbedOptions, EmbedProvider } from '../embed';

export default class Codepen implements EmbedProvider {
    parseEmbedURL(code: string): string {
        let embedURL = code;

        if (!code.startsWith('https://codepen.io/')) {
            embedURL = `https://codepen.io/${encodeURIComponent(code)}`;
        }

        return embedURL.replace(new RegExp('/pen/'), '/embed/');
    }

    render(code: string, options: EmbedOptions): string {
        const embedSrc = this.parseEmbedURL(code);

        return renderEmbed({
            height: 400,
            src: `${embedSrc}?height=400&theme-id=0&default-tab=js,result&embed-version=2`,
            frameborder: 0,
            allowtransparency: true,
            webkitallowfullscreen: true,
            mozallowfullscreen: true,
            allowfullscreen: true
        }, options);
    }
}
