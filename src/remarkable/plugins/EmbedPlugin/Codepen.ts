export default (code: string): string => {
    if (!code.startsWith('https://codepen.io/')) {
        code = 'https://codepen.io/' + encodeURIComponent(code)
    }

    code = code.replace(new RegExp('/pen/'), '/embed/')

    return `<iframe class="w-100" height="400" src="${code}?height=400&theme-id=0&default-tab=js,result&embed-version=2" ` +
        'frameborder="no" allowtransparency="true" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>'
}
