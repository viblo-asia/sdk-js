"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Prism = require("prismjs");
var loadLanguages = require("prismjs/components/index");
var utils_1 = require("markdown-it/lib/common/utils");
loadLanguages([
    'actionscript',
    'apacheconf',
    'cpp',
    'arduino',
    'asciidoc',
    'bash',
    'basic',
    'clojure',
    'coffeescript',
    'csharp',
    'd',
    'dart',
    'diff',
    // 'django',
    'docker',
    'elixir',
    'elm',
    'erb',
    'erlang',
    'gherkin',
    'go',
    'graphql',
    'haml',
    'handlebars',
    'haskell',
    'haxe',
    'hsts',
    'http',
    'ini',
    'java',
    'json',
    'jsx',
    'kotlin',
    'latex',
    'less',
    'lisp',
    'livescript',
    'lua',
    'makefile',
    'markdown',
    'matlab',
    'nginx',
    'nix',
    'objectivec',
    'pascal',
    'perl',
    'php',
    'plsql',
    'powershell',
    'protobuf',
    'python',
    'q',
    'r',
    'ruby',
    'rust',
    'sass',
    'scala',
    'scss',
    'sql',
    'stylus',
    'swift',
    'twig',
    'typescript',
    'vbnet',
    'vim',
    'wasm',
    'yaml',
]);
function createHighlighter(options) {
    return function (str, lang) {
        var prismLang = Prism.languages[lang];
        var code = prismLang
            ? Prism.highlight(str, prismLang)
            : utils_1.escapeHtml(str);
        var languageClass = "" + options.langPrefix + (lang || 'none');
        return "<pre class=\"" + languageClass + "\"><code class=\"" + languageClass + "\">" + code + "</code></pre>";
    };
}
function default_1(md) {
    md.options.highlight = createHighlighter({
        langPrefix: md.options.langPrefix
    });
}
exports.default = default_1;
