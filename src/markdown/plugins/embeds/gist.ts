const parseGistURL = (code: string): string => {
    if (code.startsWith('https://')) {
        const regExp = /^(?:.*gist\.github\.com\/)([a-zA-Z0-9-]{0,38})\/([a-f0-9]*)$/;
        const match = code.match(regExp);

        if (!match) {
            return '';
        }

        return `https://gist.github.com/${match[0]}.js`;
    }

    return code;
};

export default (code: string): string => {
    const embedURL = parseGistURL(code);
    if (!embedURL) {
        return '';
    }

    const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
    const gistFrameHTML = `<html><body><script src='${embedURL}'></script></body></html>`;

    return `<div class="embed-responsive embed-responsive-16by9">
        <iframe 
            id="${id}"
            class="embed-responsive-item"
            type="text/html"
            frameborder="0"
            srcdoc="${gistFrameHTML}"></iframe>
    </div>`;
};
