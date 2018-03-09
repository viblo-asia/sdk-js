// Markdown-it type definition
// Modified from @types/markdown-it

declare const MarkdownIt: MarkdownItStatic;

declare module 'markdown-it' {
    export = MarkdownIt;
}

interface MarkdownItStatic {
    new (presetName?: 'commonmark' | 'zero' | 'default', options?: MarkdownIt.Options): MarkdownIt.MarkdownIt;
    new (options: MarkdownIt.Options): MarkdownIt.MarkdownIt;
    (presetName?: 'commonmark' | 'zero' | 'default', options ?: MarkdownIt.Options): MarkdownIt.MarkdownIt;
    (options: MarkdownIt.Options): MarkdownIt.MarkdownIt;
}

declare namespace MarkdownIt {
    interface MarkdownIt {
        block: ParserBlock;
        core: Core;
        helpers: any;
        inline: ParserInline;
        linkify: LinkifyIt.LinkifyIt;
        renderer: Renderer;
        utils: {
            assign (obj: any): any;
            isString (obj: any): boolean;
            has (object: any, key: string): boolean;
            unescapeMd (str: string): string;
            unescapeAll (str: string): string;
            isValidEntityCode (str: any): boolean;
            fromCodePoint (str: string): string;
            escapeHtml (str: string): string;
            arrayReplaceAt (src: any[], pos: number, newElements: any[]): any[]
            isSpace (str: any): boolean;
            isWhiteSpace (str: any): boolean
            isMdAsciiPunct (str: any): boolean;
            isPunctChar (str: any): boolean;
            escapeRE (str: string): string;
            normalizeReference (str: string): string;
        };

        render (md: string, env?: any): string;
        renderInline (md: string, env?: any): string;
        parse (src: string, env: any): Token[];
        parseInline (src: string, env: any): Token[];
        use (plugin: any, ...params: any[]): MarkdownIt;
        disable (rules: string[] | string, ignoreInvalid?: boolean): MarkdownIt;
        enable (rules: string[] | string, ignoreInvalid?: boolean): MarkdownIt;
        set (options: Options): MarkdownIt;
        normalizeLink (url: string): string;
        normalizeLinkText (url: string): string;
        validateLink (url: string): boolean;
    }

    interface Options {
        html?: boolean;
        xhtmlOut?: boolean;
        breaks?: boolean;
        langPrefix?: string;
        linkify?: boolean;
        typographer?: boolean;
        quotes?: string;
        highlight?: (str: string, lang: string) => void;
    }

    interface State {
        src: string;
        level: number;
        tokens: Token[];
        push (type: string, tag: string, nesting: number): Token;
    }

    interface StateInline extends State {
        pos: number;
        posMax: number;
        pending: string;
    }

    interface StateBlock extends State {
        line: number;
        bMarks: number[];
        eMarks: number[];
        tShift: number[];
        sCount: number[];
        blkIndent: number;
        getLines (begin?: number, end?: number, indent?: number, keepLastLF?: boolean): string[];
    }

    interface Renderer {
        rules: { [name: string]: TokenRender };
        render (tokens: Token[], options: any, env: any): string;
        renderAttrs (token: Token): string;
        renderInline (tokens: Token[], options: any, env: any): string;
        renderToken (tokens: Token[], idx: number, options: any): string;
    }

    interface Token {
        attrGet: (name: string) => string | null;
        attrIndex: (name: string) => number;
        attrJoin: (name: string, value: string) => void;
        attrPush: (attrData: string[]) => void;
        attrSet: (name: string, value: string) => void;
        attrs: string[][];
        block: boolean;
        children: Token[];
        content: string;
        hidden: boolean;
        info: string;
        level: number;
        map: number[];
        markup: string;
        meta: any;
        nesting: number;
        tag: string;
        type: string;
    }

    type TokenRender = (tokens: Token[], index: number, options: any, env: any, self: Renderer) => void;

    interface Rule {
        (state: any): void;
    }

    interface Ruler {
        after (afterName: string, ruleName: string, rule: Function, options?: any): void;
        at (name: string, rule: Function, options?: any): void;
        before (beforeName: string, ruleName: string, rule: Function, options?: any): void;
        disable (rules: string | string[], ignoreInvalid?: boolean): string[];
        enable (rules: string | string[], ignoreInvalid?: boolean): string[];
        enableOnly (rule: string, ignoreInvalid?: boolean): void;
        getRules (chain: string): Rule[];
        push (ruleName: string, rule: Function, options?: any): void;
    }

    interface ParserBlock {
        ruler: Ruler;
        parse (src: string, md: MarkdownIt, env: any, outTokens: Token[]): void;
    }

    interface Core {
        ruler: Ruler;
        process (state: any): void;
    }

    interface ParserInline {
        ruler: Ruler;
        ruler2: Ruler;
        parse (src: string, md: MarkdownIt, env: any, outTokens: Token[]): void;
    }
}

declare namespace LinkifyIt {
    interface Options {
        fuzzyLink?: boolean;
        fuzzyEmail?: boolean;
        fuzzyIP?: boolean;
    }

    interface MatchDescription {
        __schema__: string;
        __index__: number;
        __lastIndex__: number;
        __raw__: string;
        __text__: string;
        __url__: string;
    }

    interface LinkifyIt {
        tlds (lang: string, linkified: boolean): this;
        add (schema: string, definition: string | RegExp | object): this;
        set (options: Options): this;
        test (text: string): boolean;
        pretest (text: string): boolean;
        match (text: string): MatchDescription;
    }
}
