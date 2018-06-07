import { EmbedOptions } from '../embed';
import { renderEmbed } from '../../utils';

const parseYoutubeURL = (code: string): string => {
    if (code.startsWith('https://')) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = code.match(regExp);
        if (!match || match[7].length !== 11) {
            return '';
        }

        return encodeURIComponent(match[7]);
    }

    return code;
};

export default (str: string, options: EmbedOptions): string => {
    const embedURL = parseYoutubeURL(str);

    if (!embedURL) {
        return str;
    }

    return renderEmbed({
        type: 'text/html',
        src: `https://www.youtube.com/embed/${embedURL}`,
        frameborder: 0,
        webkitallowfullscreen: true,
        mozallowfullscreen: true,
        allowfullscreen: true
    }, options);
};
