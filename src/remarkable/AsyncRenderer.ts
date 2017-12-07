import { Rule, Token } from '../types/markdown'
const bluebird = require('bluebird')
const rules = require('remarkable/lib/rules')

export class AsyncRenderer {
    rules: { [key: string]: Rule }
    getBreak: any

    constructor (rules?: { [key: string]: Rule }) {
        this.rules = Object.assign({}, rules)
    }

    private * iterateInline (tokens: Array<Token>, options: object, env: object): any|Iterable<any> {
        const _rules = this.rules
        let len = tokens.length
        let i = 0
    
        while (len--) {
            yield _rules[tokens[i].type](tokens, i++, options, env, this)
        }
    }

    private * iterateBlock (tokens: Array<Token>, options: object, env: object): any|Iterable<any> {
        const _rules = this.rules
        let len = tokens.length
        let i = -1

        while (++i < len) {
            if (tokens[i].type === 'inline') {
                yield* this.iterateInline(tokens[i].children || [], options, env)
            } else {
                yield _rules[tokens[i].type](tokens, i, options, env, this)
            }
        }
    }

    async renderInline (tokens: Array<Token>, options: object, env: object): Promise<string> {
        return await bluebird.reduce(
            this.iterateInline(tokens, options, env),
            (r: string, v:string) => r + v,
            ''
        )
    }

    async render (tokens: Array<Token>, options: object, env: object): Promise<string> {
        return await bluebird.reduce(
            this.iterateBlock(tokens, options, env),
            (r: string, v:string) => r + v,
            ''
        )
    }
}
