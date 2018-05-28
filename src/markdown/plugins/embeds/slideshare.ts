const parseSlideShareURL = (code: string, baseURL: string): string => {
    const isSlideShareID = /^([0-9])+$/.test(code);
    const isSlideShareURL = /^(?:(?:http|https):\/\/)?(?:www\.)?(slideshare\.net\/.+)$/.test(code);
    const matchesEmbed = code.match(/^(?:(?:http|https):\/\/)?(?:www\.)?(slideshare\.net\/slideshow\/embed_code\/.+)$/);

    if (isSlideShareID) {
        return `https://slideshare.net/slideshow/embed_code/${code}`;
    }

    if (!isSlideShareURL) {
        return '';
    }

    if (matchesEmbed) {
        return `https://${matchesEmbed[1]}`;
    }

    return `${baseURL}/embed/slideshare/?url=${code}`;
};

export default ({ baseURL }) => (code: string): string => {
    const embedURL = parseSlideShareURL(code, baseURL);

    if (!embedURL) return code;

    return `<div class="embed-responsive embed-responsive-16by9">
        <iframe
            class="embed-responsive-item"
            type="text/html"
            src="${embedURL}"
            frameborder="0"
            allowFullScreen="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"></iframe>
    </div>`;
};
