export interface Plugin {
    (instance: RemarkableInterface, options?: any): void
}

export interface RemarkableOptions {
    [key:string]: any
}

export interface State {
    line: number
    src: string
    pending: string
    level: number
    pos: number
    posMax: number
    tokens: Array<Token>
    tShift: Array<number>
    bMarks: Array<number>
    eMarks: Array<number>
    blkIndent: number
    push(token: Token): void
    getLines(begin?: number, end?: number, indent?: number, keepLastLF?: boolean): Array<string>
}

export interface RemarkableInterface {
    inline: any
    block: any
    renderer: any
    options: RemarkableOptions
    new (options?: RemarkableOptions): RemarkableInterface
    new (preset?: string, options?: RemarkableOptions): RemarkableInterface
    set (options: object): void
    use (plugin: Plugin, options?: object): void
    parse (str: string, env?: object): any
    render (str: string, env?: object): string|Promise<string>
    parseInline (str: string, env?: object): any
    renderInline (str: string, env?: object): any
}

export interface Token {
    type: string
    markup?: string
    tag?: string
    content?: any
    block?: boolean
    map?: Array<number>
    children?: Array<Token>
    [key: string]: any
}

export interface Rule {
    (tokens: Array<Token>, idx:number, options: object, env: object, renderer: any): string|Promise<string>
}
