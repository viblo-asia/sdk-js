import { renderEmbed } from '../../utils';
import { EmbedOptions, EmbedProvider } from '../embed';

export default class Gist implements EmbedProvider {
    parseEmbedURL(code): string {
        const regExp = /^(?:.*gist\.github\.com\/)([a-zA-Z0-9-]{0,38}\/[a-f0-9]+)$/;
        const match = code.match(regExp);
        return match ? `https://gist.github.com/${match[1]}.js` : '';
    }

    render(code: string, options: EmbedOptions): string {
        const embedURL = this.parseEmbedURL(code);

        if (!embedURL) return code;

        const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        const gistFrameHTML = `<html><body><script src='${embedURL}'></script></body></html>`;

        return renderEmbed({
            id,
            type: 'text/html',
            srcdoc: gistFrameHTML,
            frameborder: 0
        }, options);
    }
}
