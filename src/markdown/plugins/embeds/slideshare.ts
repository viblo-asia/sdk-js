export default (code: string): string => {
    if (!code.startsWith('http') && !code.match(/^(http|https):\/\/slideshare.net\/slideshow\/embed_code\/.*/)) {
        code = `https://slideshare.net/slideshow/embed_code/${encodeURIComponent(code)}`;
    }

    return '<div class="embed-responsive embed-responsive-16by9">' +
        `<iframe class="embed-responsive-item" type="text/html" src="${code}" frameborder="0" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>` +
        '</div>';
};
