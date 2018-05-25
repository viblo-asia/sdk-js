const parseCodepenURL = (code: string): string => {
    let embedURL = code;

    if (!code.startsWith('https://codepen.io/')) {
        embedURL = `https://codepen.io/${encodeURIComponent(code)}`;
    }

    return embedURL.replace(new RegExp('/pen/'), '/embed/');
};

export default (code: string): string => {
    const embedSrc = parseCodepenURL(code);

    return `<iframe
                class="w-100"
                height="400"
                src="${embedSrc}?height=400&theme-id=0&default-tab=js,result&embed-version=2"
                frameborder="no"
                allowtransparency="true"
                allowFullScreen="true"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"></iframe>`;
};
