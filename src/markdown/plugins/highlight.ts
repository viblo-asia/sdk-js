import hljs = require('highlight.js');

export default function (str: string, lang: string) {
    try {
        return lang && hljs.getLanguage(lang)
            ? hljs.highlight(lang, str).value
            : hljs.highlightAuto(str).value;
    } catch (e) {
        return str;
    }
}
