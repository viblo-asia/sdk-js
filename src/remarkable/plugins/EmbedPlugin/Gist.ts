export default (code: string): string => {
    if (code.startsWith('https://')) {
        const regExp = /^(?:.*gist\.github\.com\/)([a-zA-Z0-9-]{0,38})\/([a-f0-9]*)$/
        const match = code.match(regExp)
        if (!match) {
            return ''
        }
        code = `https://gist.github.com/${match[0]}.js`
    }

    const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    const gistFrameHTML = `<html><body><script type='text/javascript' src='${code}'></script></body></html>`

    return '<div class="embed-responsive embed-responsive-16by9">' +
        `<iframe id="${id}" class="embed-responsive-item" type="text/html" frameborder="0" srcdoc="${gistFrameHTML}"></iframe>` +
        '</div>'
}
