import { Plugin, RemarkableInterface, State, Token } from '../../types/markdown'

const render = (tokens: Array<Token>, index: number, options: any) => {
    let token = tokens[index]
    return `<a href="${options.mention.url}/${token.username}">@${token.username}</a>`
}

const checkPrecedingChar = (src: string, pos: number) => {
    if (pos === 0) {
        return true
    }

    let char = src.charAt(pos - 1)

    return /[\s.,;:]/.test(char)
}

const token = (username: string, state: State): Token => ({
    type: 'mention',
    username,
    block: false,
    level: state.level
})

const reserved = (word: string, reserved: string) => reserved.length > 0 && reserved.includes(word)

const parser = (md: RemarkableInterface, options: any) => (state: State) => {
    if (state.src.charAt(state.pos) !== '@' || !checkPrecedingChar(state.src, state.pos)) {
        return false
    }

    let text = state.src.slice(state.pos)
    let matches = /^@([\w_.\\-]{3,255})\b/.exec(text)

    if (!matches || reserved(matches[1], options.reserved)) {
        return false
    }

    state.pos += matches[0].length
    state.push(token(matches[1], state))

    return true
}

export const MentionsPlugin: Plugin = (md: RemarkableInterface, options: any) => {
    options.url = options.url || ''
    options.reserved = options.reserved || []
    md.options.mention = options

    md.inline.ruler.push('mention', parser(md, options), {alt: []})
    md.renderer.rules.mention = render
}
