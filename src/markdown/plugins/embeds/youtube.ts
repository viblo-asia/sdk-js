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

export default (code: string): string => {
    const embedURL = parseYoutubeURL(code);

    return !embedURL ? '' : `<div class="embed-responsive embed-responsive-16by9">
        <iframe
            class="embed-responsive-item"
            type="text/html"
            src="https://www.youtube.com/embed/${embedURL}"
            frameborder="0"
            allowFullScreen="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"></iframe>
    </div>`;
};
