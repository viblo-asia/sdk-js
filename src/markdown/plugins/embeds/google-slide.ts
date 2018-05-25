const encodeURI = (uri: string): string => {
    return `https://docs.google.com/presentation/d/${encodeURIComponent(uri)}/embed`
        + `?start=false&loop=false&delayms=3000`;
};

const parseGoogleSlideURL = (code: string): string => {
    if (code.startsWith('https://docs.google.com/presentation/d/')) {
        const match = code.match(/[-\w]{25,}/);
        return !match ? '' : encodeURI(match[0]);
    }

    return encodeURI(code);
};

export default (code: string): string => {
    const embedURL = parseGoogleSlideURL(code);
    if (!embedURL) {
        return '';
    }

    return `<div class="embed-responsive embed-responsive-16by9">
        <iframe
            class="embed-responsive-item"
            src="${code}"
            frameborder="0"
            allowfullscreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"></iframe>
    </div>`;
};
