import { EmbedOptions } from '../embed';
import { renderEmbed } from '../../utils';

const parseCodepenURL = (code: string): string => {
    let embedURL = code;

    if (!code.startsWith('https://codepen.io/')) {
        embedURL = `https://codepen.io/${encodeURIComponent(code)}`;
    }

    return embedURL.replace(new RegExp('/pen/'), '/embed/');
};

export default (str: string, options: EmbedOptions): string => {
    const embedSrc = parseCodepenURL(str);

    const classAttr = options.iframeClass ? `class="${options.iframeClass}"` : '';

    return renderEmbed({
        height: 400,
        src: `${embedSrc}?height=400&theme-id=0&default-tab=js,result&embed-version=2`,
        frameborder: 0,
        allowtransparency: true,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
};
