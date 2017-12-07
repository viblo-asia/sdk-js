import { Plugin } from '../../../types/markdown'
const { Plugin: Embed } = require('remarkable-embed')

import Codepen from './Codepen'
import Gist from './Gist'
import GoogleSlides from './GoogleSlides'
import SlideShare from './SlideShare'
import Vimeo from './Vimeo'
import Youtube from './Youtube'

export {
    Codepen,
    Gist,
    GoogleSlides,
    SlideShare,
    Vimeo,
    Youtube,
}

export const EmbedPlugin: Plugin = (md, options) => {
    const embed = new Embed()
    embed.register('codepen', Codepen)
    embed.register('gist', Gist)
    embed.register('googleslide', GoogleSlides)
    embed.register('slideshare', SlideShare)
    embed.register('vimeo', Vimeo)
    embed.register('youtube', Youtube)
    md.use(embed.hook)
}
