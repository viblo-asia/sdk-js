const encodeURI = (uri: string): string => {
    return `https://player.vimeo.com/video/${encodeURIComponent(uri)}`;
};

const parseVimeoURL = (code: string): string => {
    if (code.startsWith('https://')) {
        const regExp = /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
        const match = code.match(regExp);
        if (!match || match[5].length === 0) {
            return '';
        }

        return encodeURI(match[5]);
    }

    return encodeURI(code);
};

export default (code: string): string => {
    const embedURL = parseVimeoURL(code);
    if (!embedURL) {
        return '';
    }

    return `<div class="embed-responsive embed-responsive-16by9">
        <iframe
            class="embed-responsive-item"
            type="text/html"
            src="${embedURL}"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen></iframe>
    </div>`;
};
