import { getLanguage, highlight, highlightAuto } from 'highlight.js'
import { RemarkableInterface, RemarkableOptions } from '../types/markdown'
const Remarkable = require('remarkable')
// import AsyncRemarkable from './remarkable/AsyncRemarkable'
import { KatexPlugin } from './plugins/KatexPlugin'
import { EmbedPlugin } from './plugins/EmbedPlugin'
import { MentionsPlugin } from './plugins/MentionsPlugin'

export class VibloRemarkable extends (Remarkable as RemarkableInterface) implements RemarkableInterface {
    constructor (options: RemarkableOptions = {}) {
        options = Object.assign({
            linkify: true,
            baseUrl: '',
            highlight (str, lang) {
              if (lang && getLanguage(lang)) {
                  try {
                      return highlight(lang, str).value
                  } catch (err) {}
              }
      
              try {
                  return highlightAuto(str).value
              } catch (err) {}
      
              return '' // use external default escaping
          }
        }, options)
        super(options)

        this.use(EmbedPlugin)

        this.use(MentionsPlugin, {
            url: `${options.baseUrl}/u`,
            reserved: ['youtube', 'vimeo', 'codepen', 'gist', 'slideshare', 'googleslide']
        })

        this.use(KatexPlugin, {
            throwOnError: false
        })
    }
}
