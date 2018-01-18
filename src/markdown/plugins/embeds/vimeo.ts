export default (code: string): string => {
    if (code.startsWith('https://')) {
        const regExp = /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
        const match = code.match(regExp);
        if (!match || match[5].length === 0) {
            return '';
        }
        code = match[5];
    }
    code = 'https://player.vimeo.com/video/' + encodeURIComponent(code);

    return '<div class="embed-responsive embed-responsive-16by9">' +
        `<iframe class="embed-responsive-item" type="text/html" src="${code}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>` +
        '</div>';
};
