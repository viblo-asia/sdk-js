import { EmbedOptions } from '../embed';
import { renderEmbed } from '../../utils';

export default (str: string, options: EmbedOptions): string => {
    const regExp = /^(?:.*gist\.github\.com\/)([a-zA-Z0-9-]{0,38}\/[a-f0-9]+)$/;
    const match = str.match(regExp);
    if (!match) {
        return str;
    }

    const embedURL = `https://gist.github.com/${match[1]}.js`;
    const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    const gistFrameHTML = `<html><body><script src='${embedURL}'></script></body></html>`;

    return renderEmbed({
        id,
        type: 'text/html',
        srcdoc: gistFrameHTML,
        frameborder: 0
    }, options);
};
